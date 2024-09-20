import { createContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const socket = io(import.meta.env.VITE_HOST_URL, {                
    transports : ['websocket']
});