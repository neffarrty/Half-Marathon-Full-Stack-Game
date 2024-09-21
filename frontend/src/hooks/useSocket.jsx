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
                sock.on('connect_error', (err) => {
                    console.log("Connection Error: ", err);
                });
                
                sock.on('connect_failed', (err) => {
                    console.log("Connection Failed: ", err.message);
                });
                
                sock.on('disconnect', (err) => {
                    console.log("Disconnected: ", err.message);
                });
        
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