import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function HomePage() {
    const { user } = useContext(UserContext);

    return user ? <h1>Home</h1> : <Navigate to='/login'/>;
};