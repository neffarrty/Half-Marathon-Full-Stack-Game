import { useState, useEffect } from 'react';

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export default function useUser() {
    const [user, setUser] = useState(getUser());

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }
    
    return {
        user,
        saveUser
    };
}