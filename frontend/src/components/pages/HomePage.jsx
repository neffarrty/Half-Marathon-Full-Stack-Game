import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useUserContext from '../../hooks/useUserContext';
import useSocketContext from '../../hooks/useSocketContext';

export default function HomePage() {
    const { user } = useUserContext();
    const [socket, setSocket] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_HOST_URL, {
            query: {
                'token': user.token
            }
        });

        newSocket.on('connect_error', (err) => {
            console.log("Connection Error: ", err.message);
        });
        
        newSocket.on('connect_failed', (err) => {
            console.log("Connection Failed: ", err.message);
        });
        
        newSocket.on('disconnect', (err) => {
            console.log("Disconnected: ", err.message);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        }
    }, [user.token]);

    const onGameFound = (gameId) => {
        setIsSearching(false);
        navigate(`/game/${gameId}`);
    };

    const onGameSearch = (token) => {
        if (socket) {
            socket.emit('game-search', { token });
            setIsSearching(true);
        }
    }
    
    useEffect(() => {
        if (socket) {
            socket.on('game-found', onGameFound);
        
            return () => {
                socket.off('game-found', onGameFound);
            };
        }
    }, [socket]);

    return user ? <button onClick={ () => onGameSearch(user.token) }>Start game</button> : <Navigate to='/login'/>;
}
