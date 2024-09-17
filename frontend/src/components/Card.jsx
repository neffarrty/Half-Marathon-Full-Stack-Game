import { useState } from 'react';

export default function Card ({ name, description, img, attack, defense }) {
    const [health, setHealth] = useState(10);
    
    const style = {
        border: '2px solid black',
        borderRadius: '1em',
        padding: '1em'
    };

    return (
        <div style={style}>
            <div>
                <img src='' alt='hero image' />
            </div>
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>Health: {health}</h2>
            <button onClick={() => setHealth((health) => health - 1)}>
                Minus health
            </button>
        </div>
    )
}