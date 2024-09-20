import { useContext } from 'react';
import { SocketContext } from '../contexts/socket/SocketContext';

export default function useSocketContext() {
    const context = useContext(SocketContext);

    if (context === undefined) {
        throw new Error('useSocketContext context within SocketContextProvider!');
    }

    return context;
};