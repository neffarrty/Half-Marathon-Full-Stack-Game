import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import useSocketContext from '../../hooks/useSocketContext';

export default function HomePage() {
    const { user } = useUserContext();
    const socket = useSocketContext();
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    
    const onGameFound = (gameId) => {
        setIsSearching(false);
        navigate(`/game/${gameId}`);
    };
    
    const onGameSearch = (token) => {
        socket.emit('game-search', { token });
        setIsSearching(true);
    }
    
    useEffect(() => {
        socket.on('game-found', onGameFound);
    
        return () => {
            socket.off('game-found', onGameFound);
        };
    });

    return user ? <button onClick={ () => onGameSearch(user.token) }>Start game</button> : <Navigate to='/login'/>;
};