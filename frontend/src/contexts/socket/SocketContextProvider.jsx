import useSocket from '../../hooks/useSocket';
import { SocketContext } from './SocketContext';

export default function SocketContextProvider({ children }) {  
    const socket = useSocket(import.meta.env.VITE_HOST_URL);
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};