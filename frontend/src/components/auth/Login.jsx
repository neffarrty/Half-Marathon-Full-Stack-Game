import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../FormField';
import useAuth from '../../hooks/useAuth';
import '../../styles/Login.css';

export default function Login() {
    const [input, setInput] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { login, error } = useAuth();
    
    useEffect(() => {
        (async () => {
            if (submitted && Object.keys(errors).length === 0) {
                await login(input);
            }
        })();
    }, [errors]);
    
    const checkErrors = (input) => {
        const errors = {};
        const { username, password } = input;

        if (username.length === 0) {
            errors.username = 'Please provide a username';
        }
        if (password.length === 0) {
            errors.password = 'Please provide a password'; 
        }
        
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(checkErrors(input));
        setSubmitted(true);
    };

    const handleInput = (data) => {
        const { name, value } = data;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-content'>
                    <FormField 
                        title='Username' 
                        type='text' 
                        name='username' 
                        onChange={handleInput}
                        error={errors.username}
                    />
                    <FormField 
                        title='Password'
                        type='password'
                        name='password'
                        onChange={handleInput}
                        error={errors.password}
                    />
                    <Link to='/reset' className='reset-link'>Forgot password</Link>
                    <input type="submit" value="Login" />
                    { 
                        error && <div className='error-message'> { error } </div> 
                    }
                    <div className='register-link-wrapper'>
                        <span>Don't have an account? </span>
                        <Link to='/register' className='register-link'>Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};