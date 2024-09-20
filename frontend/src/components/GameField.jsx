import '../styles/GameField.css';


export default function GameField(){
    return(
        <div className='game-field'>
            <div className='opponent-cards'></div>
            <div className='center-line'></div>
            <div className='player-cards'></div>
            <button className='place-card'>Place card</button>
            <button className='end-turn'>End turn</button>
        </div>
    )
}