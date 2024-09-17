import { useEffect } from 'react';
import Card from './Card';

export default function CardHolder({ cards }) {   
    return (
        <div>
            {cards.map(card => {
                return (
                    <Card
                        key={card.name}
                        name={card.name}
                        description={card.description}
                        img={card.img}
                        attack={card.attack}
                        defense={card.defense}
                    />
                )
            })}
        </div>
    );
};