import Card from './Card';

import '../styles/GameField.css';

export default function GameField({ isTurn, setIsTurn, player, setPlayer, opponent, activeCardIndex, setActiveCardIndex }) {
    const handlePlaceCard = () => {
        if (activeCardIndex !== null) {
            // setPlayer(prev => ({
            //     ...prev,
            //     cards: prev.cards.filter((cards, index) => index !== activeCardIndex),
            //     hand: prev.cards.filter((cards, index) => index == activeCardIndex)
            // })
            
            const hand = [...player.hand];
            const selectedCard = hand[activeCardIndex];
    
            hand.splice(activeCardIndex, 1);
    
            setPlayer((prev) => ({
                ...prev,
                cards: [...prev.cards, selectedCard],
                hand: hand
            }));
    
            setActiveCardIndex(null);
        }
    };
    
    return(
        <div className='game-field'>
            <div className='opponent-cards'>
                {opponent.cards.map((hero, index) => (
                    <Card
                        key={index}
                        hero={hero}
                        // isActive={activeCardIndex === index}
                        // onClick={() => handleCardClick(index)}
                        isPlayer={true}
                    />
                ))}
            </div>
            <div className='center-line'></div>
            <div className="player-cards">
                {player.cards.map((card, index) => (
                    <Card key={index} hero={card} isPlayer={true}/>
                ))}
            </div>
            <button className='place-card' onClick={() => handlePlaceCard()}>Place card</button>
            <button 
                className='end-turn' 
                onClick={() => setIsTurn(prev => !prev)}
                disabled={!isTurn}
            >
                {isTurn ? 'End turn' : 'Opponent\'s turn'}
            </button>
        </div>
    )
}