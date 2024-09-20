import Coins from './Coins.jsx';
import ActionBar from './ActionBar.jsx';
import Timer from './Timer.jsx';
import Player from './Player.jsx';
import HandCard from './HandCard.jsx';
import GameField from './GameField.jsx';
import '../styles/GamePage.css'


export default function GamePage() {
    const { user } = useContext(UserContext);
    const [player, setPlayer] = useState({ 
        ...user,
        health: 30,
        coins: 1 
    });
    const [opponent, setOpponent] = useState({ 
        health: 30, 
        coins: 1 
    });
    // const [deck, setDeck] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [turn, setTurn] = useState(1);

    const onGameStart = ({ opponent, deck, first }) => {
        // setDeck(deck);
        setOpponent(prev => ({ ...prev, ...opponent }));
        setIsPlayerTurn(first);
    };

    const onTurnStart = (actions) => {
        actions.forEach(action => {
            if (action.type === 'PLAY') {
                // TODO handling opponents play card on field
                setOpponent(prev => ({ 
                    ...prev,
                    field: [...prev.field, action.card],
                    cards: prev.cards - 1
                }));
            }
            else {
                // TODO opponents attack card or player
                setPlayer(prev => ({
                    ...prev,
                    field: prev.field.map(card =>
                    card.id === action.target.id 
                    ? { ...card, defense: card.defense - action.card.defense } 
                    : card
                    )
                }));
            }
        });

        // set turn and coins according to the turn num
        setTurn(prev => prev + 1);
        setPlayer(prev => ({ coins: prev.coins === 10 ? prev.coins : prev.coins + 1}));
    };

    const onTurnEnd = () => {
        socket.emit('turn', actions);
        actions.length = 0;
        setOpponent(prev => ({ coins: prev.coins === 10 ? prev.coins : prev.coins + 1}));
        setIsPlayerTurn(prev => !prev);
    };

    useEffect(() => {
        socket.on('game-start', onGameStart);
        socket.on('turn', onTurnStart);

        return () => {
            socket.off('game-start', onGameStart);
            socket.off('turn', onTurnStart);
        }
    }, []);
    
    return (
        <div className='game-page'>
            <div className='first-column'>
                <Coins amount={4} max={10}/>
                <Timer seconds={60} condition={false} setCondition={false}/>
                <ActionBar actions={[]}/>
                <Player username={'Andrey'} hp={25} avatar={''}/>
            </div>
            <div className='second-column'>
                <HandCard cards={[]} isPlayerCard={false}/>
                <GameField/>
                <HandCard cards={[]} isPlayerCard={true}/>
            </div>
            <div className='third-column'>
                <Player username={'Egor'} hp={35} avatar={''}/>
                <Coins amount={4} max={10}/>
            </div>
        </div>
    );
}