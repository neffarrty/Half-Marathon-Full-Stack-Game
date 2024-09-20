import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(url) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io(url, {                
            transports : ['websocket']
        }));

        return () => {
            socket.close();
        }
    }, []);

    return socket;
};