import { io } from "socket.io-client";

const socket = io();

// * HomePage button "Start game" onClick

const { user } = useContext(UserContext);
const [isSearching, setIsSearching] = useState(false);

useEffect(() => {
    socket.emit('game-search', { token: user.token });
    setIsSearching(true);
    
    socket.on('game-found', (gameId) => {
        setIsSearching(false);
        navigate(`/game?game_id=${gameId}`);
    });
});

// * GamePage

const [player, setPlayer] = useState({ ...user, health: 30, coins: 1 });
const [opponent, setOpponent] = useState({ health: 30, coins: 1 });
const [deck, setDeck] = useState([]);

useEffect(() => {
    const onGameStart = ({ opponent, deck, first }) => {
        setDeck(deck)
        setOpponent(prev => ({ ...prev, ...opponent }));
    };

    socket.on('game-start', onGameStart);

    return () => {
        socket.off('game-start', onGameStart);
    }
}, []);

const onTurnEnd = () => {
    socket.emit('turn', data);
};

// socket.on('error', error => {
//     setError(error);
// });