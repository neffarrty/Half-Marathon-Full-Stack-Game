import { Outlet } from 'react-router-dom';
import SocketContextProvider from './SocketContextProvider';

export default function SocketContextLayout() {   
    return (
        <SocketContextProvider>
            <Outlet />
        </SocketContextProvider>
    );
};