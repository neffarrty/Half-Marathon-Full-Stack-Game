import Card from './Card.jsx';
import {useState} from 'react';
import '../styles/HandCard.css';

export default function HandCard({cards,isPlayerCard}) {
    const [activeCardIndex, setActiveCardIndex] = useState(null);

    const handleCardClick = (index) => {
        setActiveCardIndex(index);
    };

    return isPlayerCard ?
        <div className='cards-player'>{
            cards.map((hero, index) => (
            <Card
                key={index}
                hero={hero}
                isActive={activeCardIndex === index}
                onClick={() => handleCardClick(index)}
                isPlayerCard={isPlayerCard}
            />
            ))
        }</div>
        :
        <div className='cards-opponent'>{
            cards.map((_, index) => (
            <Card
                key={index}
                hero={_}
                isActive={false}
                onClick={false}
                isPlayerCard={isPlayerCard}
            />
            ))
        }</div>

};