import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSocketContext from '../hooks/useSocketContext';
import Card from './Card';
import '../styles/GameField.css';

export default function GameField({ isTurn, setIsTurn, turn, player, setPlayer, opponent, setOpponent, activeCardIndex, setActiveCardIndex, setActions }) {
    const socket = useSocketContext();
    const { state } = useLocation();
    const [activeCard, setActiveCard] = useState(null);
    const [targetCard, setTargetCard] = useState(null);
    const [usedCards, setUsedCards] = useState([]);
    
    useEffect(() => {
        console.log(activeCard, targetCard);
        if (usedCards.includes(activeCard)) {
            setActiveCard(null);
            setTargetCard(null);
        }
        
        if (targetCard !== null && activeCard !== null) {
            const action = { 
                user: player.username, 
                type: 'attack', 
                target: opponent.cards[targetCard],
                card: player.cards[activeCard],
                gameRoom: state.gameRoom
            };

            setUsedCards(prev => [...prev, activeCard]);
            setActions(prev => [...prev, action]);
            setActiveCard(null);
            setTargetCard(null);

            socket.emit('action', action);
        }
    }, [activeCard, targetCard]);

    useEffect(() => {
        console.log(usedCards);
    }, [usedCards]);

    useEffect(() => {
        setActiveCard(null);
        setTargetCard(null);
        setUsedCards([]);
    }, [isTurn]);

    const handleEndTurn = () => {
        setIsTurn(prev => !prev);
        setOpponent(prev => ({ ...prev, coins: turn > 10 ? 10 : turn }));
        socket.emit('turn', { gameRoom: state.gameRoom });
    }

    const handlePlaceCard = () => {
        if (activeCardIndex !== null) {           
            const hand = [...player.hand];
            const selectedCard = hand[activeCardIndex];
    
            if (selectedCard.cost <= player.coins) {
                hand.splice(activeCardIndex, 1);
        
                const action = { 
                    user: player.username, 
                    type: 'play', 
                    card: selectedCard, 
                    gameRoom: state.gameRoom
                };
                
                setPlayer((prev) => ({
                    ...prev,
                    cards: [...prev.cards, selectedCard],
                    hand: hand,
                    coins: prev.coins - selectedCard.cost
                }));
                setActions(prev => [...prev, action]);
                setActiveCardIndex(null);

                socket.emit('action', action);
            }
        }
    };
    
    return(
        <div className='game-field'>
            <div className='opponent-cards'>
                {opponent.cards.map((hero, index) => (
                    <Card
                        key={index}
                        hero={hero}
                        isPlayer={true}
                        onClick={() => setTargetCard(index)}
                    />
                ))}
            </div>
            <div className='center-line'></div>
            <div className="player-cards">
                {player.cards.map((card, index) => (
                    <Card 
                        key={index} 
                        hero={card} 
                        isPlayer={true}
                        onClick={() => setActiveCard(index)}
                    />
                ))}
            </div>
            <button 
                className='place-card' 
                onClick={() => handlePlaceCard()}
                disabled={player.cards.length === 5 || !isTurn}
            >
                Place card
            </button>
            <button 
                className='end-turn' 
                onClick={() => handleEndTurn()}
                disabled={!isTurn}
            >
                {isTurn ? 'End turn' : 'Opponent\'s turn'}
            </button>
        </div>
    )
}