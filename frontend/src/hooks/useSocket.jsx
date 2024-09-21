import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import useUserContext from './useUserContext';

export default function useSocket(url) {
    const [socket, setSocket] = useState(null);
    const { user } = useUserContext();

    useEffect(() => {
        const newSocket = io(url, {
            transports: ['websocket'],
            query: {
                'token': user.token
            }
        });

        if (newSocket) {
            newSocket.on('connect_error', (err) => {
                console.log("Connection Error: ", err);
            });
            
            newSocket.on('connect_failed', (err) => {
                console.log("Connection Failed: ", err.message);
            });
            
            newSocket.on('disconnect', (err) => {
                console.log("Disconnected: ", err.message);
            });
    
            setSocket(newSocket);
        }

        return () => {
            if (socket) {
                newSocket.close();
            }
        }
    }, [user.token]);

    return socket;
};