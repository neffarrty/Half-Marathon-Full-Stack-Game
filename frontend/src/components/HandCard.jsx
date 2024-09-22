import Card from './Card.jsx';
import '../styles/HandCard.css';

export default function HandCard({ cards, isPlayer, activeCardIndex, setActiveCardIndex }) {
    const handleClick = (index) => {
        setActiveCardIndex(prev => prev === index ? null : index);
    }
    
    return isPlayer ?
        <div className='cards-player'>
            {cards.map((hero, index) => (
                <Card
                    key={index}
                    hero={hero}
                    isActive={activeCardIndex === index}
                    onClick={() => handleClick(index)}
                    isPlayer={isPlayer}
                />
            ))}
        </div>
        :
        <div className='cards-opponent'>{
            cards.map((_, index) => (
            <Card
                key={index}
                hero={_}
                isActive={false}
                onClick={false}
                isPlayer={isPlayer}
            />
            ))
        }</div>

};