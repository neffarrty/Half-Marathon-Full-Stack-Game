import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSocketContext from '../hooks/useSocketContext';
import Card from './Card';
import '../styles/GameField.css';

export default function GameField({ isTurn, setIsTurn, turn, player, setPlayer, opponent, setOpponent, activeCardIndex, setActiveCardIndex, setActions }) {
    const socket = useSocketContext();
    const { state } = useLocation();
    const [attackCard, setAttackCard] = useState(null);
    const [targetCard, setTargetCard] = useState(null);
    const [usedCards, setUsedCards] = useState([]);
    
    useEffect(() => {        
        if (targetCard !== null) {
            const action = { 
                user: player.username, 
                type: 'attack', 
                target: opponent.cards.find(card => card.id === targetCard),
                card: player.cards.find(card => card.id === attackCard),
                gameRoom: state.gameRoom
            };

            setPlayer(prev => ({ 
                ...prev, 
                cards: prev.cards.map((card) => {
                    if (card.id === attackCard) {
                        return { 
                            ...card,
                            defense: card.defense - opponent.cards.find(card => card.id === targetCard).attack 
                        };
                    }
                    return card;
                })
            }));
            setOpponent(prev => ({ 
                ...prev, 
                cards: prev.cards.map((card) => {
                    if (card.id === targetCard) {
                        return { 
                            ...card, 
                            defense: card.defense - player.cards.find(card => card.id === attackCard).attack 
                        };
                    }
                    return card;
                })
            }));
            setUsedCards(prev => [...prev, attackCard]);
            setActions(prev => [...prev, action]);

            socket.emit('action', action);
        }
    }, [targetCard]);

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

    const handleEndTurn = () => {
        setIsTurn(prev => !prev);
        setAttackCard(null);
        setTargetCard(null);
        setUsedCards([]);
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

    const handlePlayerCardClick = (id) => {
        if (attackCard !== id && !usedCards.includes(id) && isTurn) {
            setAttackCard(id);
        }
        else {
            setAttackCard(null);
        }
    };

    const handleOpponentCardClick = (id) => {
        if (attackCard !== null && isTurn) {
            setTargetCard(id);
        }
    };
    
    useEffect(() => {
        console.log(attackCard, targetCard);
    }, [attackCard, targetCard]);

    useEffect(() => {
        console.log(usedCards);
        console.log(usedCards.includes(attackCard));
    }, [usedCards]);
    
    return(
        <div className='game-field'>
            <div className='opponent-cards'>
                {opponent.cards.map((card) => (
                    <Card
                        key={card.id}
                        hero={card}
                        isPlayer={true}
                        onClick={() => handleOpponentCardClick(card.id)}
                    />
                ))}
            </div>
            <div className='center-line'></div>
            <div className='player-cards'>
                {player.cards.map((card) => (
                    <Card 
                        key={card.id} 
                        hero={card} 
                        isPlayer={true}
                        onClick={() => handlePlayerCardClick(card.id)}
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