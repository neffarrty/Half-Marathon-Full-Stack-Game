import { useState } from 'react';

const Card = ({ name, desc }) => {
    const [health, setHealth] = useState(10);
    
    const style = {
        border: '2px solid black',
        'border-radius': '1em',
        padding: '1em'
    };

    return (
        <div style={style}>
            <div>
                <img src='' alt='hero image' />
            </div>
            <h1>{name}</h1>
            <p>{desc}</p>
            <h2>Health: {health}</h2>
            <button onClick={() => setHealth((health) => health - 1)}>
                Minus health
            </button>
        </div>
    )
}

export default Card;