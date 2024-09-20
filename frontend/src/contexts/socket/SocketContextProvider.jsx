import { SocketContext, socket } from './SocketContext';

export default function SocketContextProvider({ children }) {  
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};