import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext.jsx';
import useSocketContext from '../../hooks/useSocketContext.jsx';

import Coins from '../Coins.jsx';
import ActionBar from '../ActionBar.jsx';
import Timer from '../Timer.jsx';
import Player from '../Player.jsx';
import HandCard from '../HandCard.jsx';
import GameField from '../GameField.jsx';

import '../../styles/GamePage.css';
import Card from "../Card.jsx";

export default function GamePage() {
    const socket = useSocketContext();
    const { user } = useUserContext();
    const { state } = useLocation();
    const [attackCard, setAttackCard] = useState(null);
    const [usedCards, setUsedCards] = useState([]);
    const [player, setPlayer] = useState({ 
        ...user,
        hp: 30,
        coins: 1,
        hand: [...state.deck],
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
    const [deckCard, setDeckCard] = useState(null);
    const [isWinner, setWinner] = useState(null);

    const onAction = (action) => {
        switch (action.type) {
            case 'play-card':
                setOpponent(prev => ({
                    ...prev,
                    cards: [...prev.cards, action.card],
                    hand: prev.hand - 1,
                    coins: prev.coins - action.card.cost
                }));
                break;
            case 'attack-card':
                setPlayer(prev => ({
                    ...prev,
                    cards: prev.cards.map(card => {
                        if (card.id === action.target.id) {
                            return { ...card, defense: card.defense - action.card.attack };
                        }
                        return card;
                    })
                }));

                setOpponent(prev => ({
                    ...prev,
                    cards: prev.cards.map(card => {
                        if (card.id === action.card.id) {
                            return { ...card, defense: card.defense - action.target.attack };
                        }
                        return card;
                    })
                }));
                break;
            case 'attack-player':
                setPlayer(prev => ({
                    ...prev,
                    hp: prev.hp - action.card.attack
                }));
                break;
        }

        setActions(prev => [...prev, action]);
    }

    useEffect(() => {
        if(player.hp < 1) {
            setWinner(false);
        }
        else if(opponent.hp < 1) {
            setWinner(true);
        }
        socket.emit('game-end', { gameRoom: state.gameRoom });
    }, [player.hp, opponent.hp]);

    const onTurnStart = (data) => {
        const { card } = data;
        
        setIsTurn(true);
        setTurn(prev => prev + 1);
        setDeckCard(card);
        
        setTimeout(() => {
            setPlayer(prev => {
                if (prev.hand.length < 7) {
                    return {
                        ...prev,
                        hand: [...prev.hand, card]
                    };
                }
                return prev;
            });
            setDeckCard(null);
        }, 3000);
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPlayer(prev => ({ 
                ...prev, 
                cards: prev.cards.filter((card) => card.defense > 0)
            }));
            setOpponent(prev => ({ 
                ...prev, 
                cards: prev.cards.filter((card) => card.defense > 0)
            }));
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [player.cards, opponent.cards]);

    const attackOpponentHero = () => {
        if(!opponent.cards.length && attackCard !== null && !usedCards.some(id => id === attackCard)) {
            const selectedCard = player.cards.find(card => card.id === attackCard);
            setOpponent(prev => ({
                ...prev,
                hp: prev.hp - selectedCard.attack
            }));

            const action = {
                user: player.username,
                opponent: opponent.username,
                type: 'attack-player',
                card: selectedCard,
                gameRoom: state.gameRoom
            };

            setUsedCards(prev => [...prev, attackCard]);
            setAttackCard(null);
            setActions(prev => [...prev, action]);

            socket.emit('action', action);
        }
    }

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
                    setAttackCard = {setAttackCard}
                    attackCard = {attackCard}
                    usedCards={usedCards}
                    setUsedCards={setUsedCards}
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
                    onClick={attackOpponentHero}
                />
                <div className="card-cnt">
                    {deckCard && <Card hero={deckCard} isPlayer={true} />}
                </div>
                <Coins amount={player.coins} max={10}/>
            </div>
            {isWinner !== null && <div className="result">
                {isWinner ? <Link to='/home'>Congratulation Master, go into the next one!</Link> : <Link to='/home'>Go home, loser!</Link>}
            </div>}
        </div>
    );
}