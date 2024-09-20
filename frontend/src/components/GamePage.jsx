import '../styles/GamePage.css'
import Coins from "./Coins.jsx";
import ActionBar from "./ActionBar.jsx";
import Timer from "./Timer.jsx";
import Player from "./Player.jsx";
import HandCard from "./HandCard.jsx";
import GameField from "./GameField.jsx";


export default function GamePage() {
    return (
        <div className='game-page'>
            <div className='first-column'>
                <Coins amount={4} max={10}/>
                <Timer seconds={60} condition={false} setCondition={false}/>
                <ActionBar actions={[]}/>
                <Player username={"Andrey"} hp={25} avatar={''}/>
            </div>
            <div className='second-column'>
                <HandCard cards={[]} isPlayerCard={false}/>
                <GameField/>
                <HandCard cards={[]} isPlayerCard={true}/>
            </div>
            <div className='third-column'>
                <Player username={"Egor"} hp={35} avatar={''}/>
                <Coins amount={4} max={10}/>
            </div>
        </div>
    );
}