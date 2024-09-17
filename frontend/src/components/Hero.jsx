import React from "react";
import "./heroCard.css";

function HeroCard({ hero }) {
    return (
        <div className="card-container" style={{backgroundColor: hero.backgroundColor}}>
            <div className="top-section">
                <img className="coin-icon" src="../assets/coin.png" alt="Coin Icon"/>
                <span className="level">{hero.cost}</span>
            </div>
            <div className="image-section">
                <img className="character-image" src={hero.img} alt={hero.name}/>
            </div>
            <p className="character-name">{hero.name}</p>
            <div className="text-box" style={{backgroundColor: hero.backgroundColorText}}>
                <span>{hero.description}</span>
            </div>
            <div className="bottom-section">
                <img className="sword-icon" src="../assets/sword.png" alt="Sword Icon"/>
                <div className="score-sword">
                    <span>{hero.attack}</span>
                </div>
                <img className="shield-icon" src="../assets/shield.png" alt="Shield Icon"/>
                <span className="score-shield">{hero.defense}</span>
            </div>
        </div>
    );
}

/*const heroes = {
    captainAmerica: {
        name: 'Captain America',
        img: '../assets/Captain_America_headshot.webp',
        description: 'Captain America is a super-soldier known for his unwavering sense of justice, leadership, and dedication to protecting freedom. Armed with his iconic shield, he fights to defend the world from evil forces.',
        cost: 10,
        attack: 60,
        defense: 60,
        backgroundColor: '#3b5998',
        backgroundColorText: '#3b5900'
    },
    ironMan: {
        name: 'Iron Man',
        img: '../assets/Iron_Man_headshot.webp',
        description: 'Iron Man is a genius billionaire playboy philanthropist who fights crime in his advanced, weaponized suit of armor. He uses technology to protect the world.',
        cost: 12,
        attack: 75,
        defense: 50,
        backgroundColor: '#ff4c4c',
        backgroundColorText: '#3b5900'
    },
    thor: {
        name: 'Thor',
        img: '../assets/Thor_headshot.webp',
        description: 'Thor, the god of thunder, wields his mighty hammer Mjolnir and fights to protect the realms. He is a powerful Asgardian warrior.',
        cost: 15,
        attack: 85,
        defense: 70,
        backgroundColor: '#00bfff',
        backgroundColorText: '#3b5900'
    }*/
export default HeroCard;