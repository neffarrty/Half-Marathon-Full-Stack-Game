import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import useUserContext from './useUserContext';

export default function useSocket(url) {
    const [socket, setSocket] = useState(null);
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            const sock = io(url, {
                transports: ['websocket'],
                query: {
                    'token': user.token
                }
            });
    
            if (sock) {        
                setSocket(sock);
            }
    
            return () => {
                if (sock) {
                    sock.close();
                }
            }
        }
    }, [user]);

    return socket;
};