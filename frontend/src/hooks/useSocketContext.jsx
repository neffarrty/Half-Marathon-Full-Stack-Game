import { useContext } from 'react';
import { SocketContext } from '../contexts/socket/SocketContext';

export default function useSocketContext() {
    const context = useContext(SocketContext);

    // if (!context) {
    //     throw new Error('Use context within provider!');
    // }

    return context;
};