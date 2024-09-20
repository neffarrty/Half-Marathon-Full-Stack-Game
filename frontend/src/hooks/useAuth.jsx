import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import axios from 'axios';

export default function useAuth() {
    const { saveUser } = useUserContext();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const register = async (data) => {
        return axios.post('http://localhost:3000/api/users', data)
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const login = async (data) => {
        return axios.post('http://localhost:3000/api/login', data)
            .then(res => {
                saveUser(res.data);
                navigate('/home');
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
    
    return {
        register,
        login,
        logout, 
        error,
    };
}