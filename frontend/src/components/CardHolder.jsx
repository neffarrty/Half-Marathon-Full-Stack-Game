import Card from './Card';

export default function CardHolder({ cards }) {   
    return (
        <>
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
        </>
    );
};