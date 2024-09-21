import { useState, useEffect } from 'react';
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
    const { state } = useLocation();
    const { user } = useUserContext();
    const socket = useSocketContext();
    const [player, setPlayer] = useState({ 
        ...user,
        hand: state.deck,
        cards: [],
        hp: 30,
        coins: 1
    });
    const [opponent, setOpponent] = useState({ 
        ...state.opponent,
        hp: 30,
        coins: 1,
        hand: 5,
        cards: []
    });
    const [isTurn, setIsTurn] = useState(state.turn);
    const [turn, setTurn] = useState(1);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const actions = [];

    const onTurnStart = (actions) => {
        actions.forEach(action => {
            if (action.type === 'PLAY') {
                // TODO handling opponents play card on field
                setOpponent(prev => ({ 
                    ...prev,
                    field: [...prev.field, action.card],
                    cards: prev.cards - 1
                }));
            }
            else {
                // TODO opponents attack card or player
                setPlayer(prev => ({
                    ...prev,
                    field: prev.field.map(card =>
                    card.id === action.target.id 
                    ? { ...card, defense: card.defense - action.card.defense } 
                    : card
                    )
                }));
            }
        });

        // set turn and coins according to the turn num
        setTurn(prev => prev + 1);
        setPlayer(prev => ({ coins: prev.coins === 10 ? prev.coins : prev.coins + 1}));
    };

    const onTurnEnd = () => {
        socket.emit('turn', actions);
        actions.length = 0;
        setOpponent(prev => ({ coins: prev.coins === 10 ? prev.coins : prev.coins + 1}));
        setIsTurn(prev => !prev);
    };

    useEffect(() => {
        socket.on('turn', onTurnStart);

        return () => {
            socket.off('turn', onTurnStart);
        }
    }, []);
    
    return (
        <div className='game-page'>
            <div className='first-column'>
                <Coins amount={4} max={10}/>
                <Timer seconds={60} condition={isTurn} setCondition={setIsTurn}/>
                <ActionBar actions={[]}/>
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
                    player={player} 
                    setPlayer={setPlayer} 
                    opponent={opponent}
                    activeCardIndex={activeCardIndex}
                    setActiveCardIndex={setActiveCardIndex}
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
                <Coins amount={4} max={10}/>
            </div>
        </div>
    );
}