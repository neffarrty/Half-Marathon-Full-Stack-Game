import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext.jsx';
import useSocketContext from '../../hooks/useSocketContext.jsx';

import Coins from '../Coins.jsx';
import ActionBar from '../ActionBar.jsx';
import Timer from '../Timer.jsx';
import Player from '../Player.jsx';
import HandCard from '../HandCard.jsx';
import GameField from '../GameField.jsx';

import '../../styles/GamePage.css';

export default function GamePage() {
    const socket = useSocketContext();
    const { user } = useUserContext();
    const { state } = useLocation();
    const [player, setPlayer] = useState({ 
        ...user,
        hp: 30,
        coins: 1,
        hand: state.deck,
        cards: []
    });
    const [opponent, setOpponent] = useState({ 
        ...state.opponent,
        hp: 30,
        coins: 1,
        hand: 5,
        cards: []
    });
    const [isTurn, setIsTurn] = useState(state.turn);
    const [turn, setTurn] = useState(state.turn ? 1 : 0);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const [actions, setActions] = useState([]);

    const onAction = (action) => {
        if (action.type === 'play') {
            setOpponent(prev => ({ 
                ...prev,
                cards: [...prev.cards, action.card],
                hand: prev.hand - 1,
                coins: prev.coins - action.card.cost
            }));
            setActions(prev => [...prev, action]);
        }
        // else {
        //
        //     setPlayer(prev => ({
        //         ...prev,
        //         field: prev.field.map(card =>
        //         card.id === action.target.id 
        //         ? { ...card, defense: card.defense - action.card.defense } 
        //         : card
        //         )
        //     }));
        // }
    }

    const onTurnStart = () => { 
        setIsTurn(true);
        setTurn(prev => prev + 1);
    };

    useEffect(() => {
        socket.on('turn', onTurnStart);
        socket.on('action', onAction);

        return () => {
            socket.off('turn', onTurnStart);
            socket.off('action', onAction);
        }
    }, []);

    useEffect(() => {
        setPlayer(prev => ({ ...prev, coins: turn > 10 ? 10 : turn }));
    }, [turn]);
    
    return (
        <div className='game-page'>
            <div className='first-column'>
                <Coins amount={opponent.coins} max={10}/>
                <Timer seconds={60} condition={isTurn} setCondition={setIsTurn}/>
                <ActionBar actions={actions}/>
                <Player 
                    username={player.username}
                    hp={player.hp}
                    avatar={`${import.meta.env.VITE_HOST_URL}${player.avatar}`}
                />
            </div>
            <div className='second-column'>
                <HandCard cards={[...Array(opponent.hand)]} isPlayer={false}/>
                <GameField
                    isTurn={isTurn}
                    setIsTurn={setIsTurn}
                    turn={turn}
                    player={player} 
                    setPlayer={setPlayer} 
                    opponent={opponent}
                    setOpponent={setOpponent}
                    activeCardIndex={activeCardIndex}
                    setActiveCardIndex={setActiveCardIndex}
                    setActions={setActions}
                />
                <HandCard 
                    cards={player.hand}
                    isPlayer={true}
                    activeCardIndex={activeCardIndex}
                    setActiveCardIndex={setActiveCardIndex}
                />
            </div>
            <div className='third-column'>
                <Player 
                    username={opponent.username}
                    hp={opponent.hp}
                    avatar={`${import.meta.env.VITE_HOST_URL}${opponent.avatar}`}
                />
                <Coins amount={player.coins} max={10}/>
            </div>
        </div>
    );
}