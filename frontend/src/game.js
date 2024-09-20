import { io } from "socket.io-client";

const socket = io();

// ------ HomePage button "Start game" onClick ------

const { user } = useContext(UserContext);
const [isSearching, setIsSearching] = useState(false);

const onGameFound = (gameId) => {
    setIsSearching(false);
    navigate(`/game/${gameId}`);
};

useEffect(() => {
    socket.emit('game-search', { token: user.token });
    setIsSearching(true);
    
    socket.on('game-found', onGameFound);

    return () => {
        socket.off('game-found', onGameFound);
    };
});

// ---------------------------------------------------

// * GamePage
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
