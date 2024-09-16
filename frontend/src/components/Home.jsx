import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    });
    
    return <h1>Home</h1>;
};