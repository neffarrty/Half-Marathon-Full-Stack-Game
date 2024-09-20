import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import useUserContext from './useUserContext';

export default function useSocket(url) {
    const [socket, setSocket] = useState(null);
    const { user } = useUserContext();

    return socket;
};