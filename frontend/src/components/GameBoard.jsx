import { useEffect, useState } from 'react';
import CardHolder from './CardHolder';
import Deck from './Deck';
import axios from 'axios';

export default function GameBoard() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios('http://localhost:3000/cards')
            .then(res => {
                setCards(res.data);
            });
    }, []);
    
    return (
        <>
            <h1>Game</h1>
            <Deck />
            <CardHolder cards={cards}/>
        </>
    );
};