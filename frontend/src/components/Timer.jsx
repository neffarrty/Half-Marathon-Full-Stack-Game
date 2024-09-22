import { useEffect, useState } from 'react';
import '../styles/Timer.css'

export default function Timer({ seconds, condition, setCondition }) {
    const [time, setTime] = useState(seconds);
    
    useEffect(() => {
        setTime(seconds);

        const interval = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            setCondition(prev => !prev)
        }, seconds * 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [condition]);

    return (
        <div>
            <div className='time'>Time: {time}</div>
            <div>{condition}</div>
        </div>
    );
};