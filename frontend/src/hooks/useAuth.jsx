import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

export default function useAuth() {
    const { saveUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const register = async (data) => {
        // const { username, email, password } = data;
        
        return axios.post('http://localhost:3001/users', data)
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                setError(err.message);
            });
        // return axios.get(`http://localhost:3000/users?username=${username}&_limit=1`, { username, email, password })
        //     .then((res) => {
        //         if (res.data.length !== 0) {
        //             setError('User exists');
        //         }
        //         else {
        //             navigate('/login');
        //         }
        //     }).catch((err) => {
        //         setError(err.message);
        //     });
    };

    const login = async (data) => {
        // const { username, password } = data;
        
        return axios.post('http://localhost:3001/login', data)
            .then(res => {
                saveUser(res.data);
                navigate('/home');
            })
            .catch(err => {
                setError(err.message);
            });
        // return axios.get(`http://localhost:3000/users?username=${username}&_limit=1`)
        //     .then((res) => {
        //         axios.get(`http://localhost:3000/users`)
        //         .then(res => {
        //             if (res.data.find(user => user.username === username && user.password === password)) {
        //                 saveUser(res.data[0]);
        //                 navigate('/home');
        //             }
        //             else {
        //                 setError('Invalid username or password');
        //             }
        //         });
        //     }).catch((err) => {
        //         setError(err.message);
        //     });
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