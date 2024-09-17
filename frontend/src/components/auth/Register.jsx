import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../FormField';
import useAuth from '../../hooks/useAuth';
import '../../styles/Register.css';

export default function Register() {
    const [input, setInput] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { register, error } = useAuth();
    
    useEffect(() => {
        (async () => {
            if (submitted && Object.keys(errors).length === 0) {
                await register(input);
            }
        })();
    }, [errors]);

    const checkErrors = (input) => {
        const errors = {};
        const { username, password, email } = input;

        if (username.length === 0) {
            errors.username = 'Please provide a username';
        }
        if (password.length === 0) {
            errors.password = 'Please provide a password'; 
        }
        if (email.length === 0) {
            errors.email = 'Incorrect email'; 
        }
        
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            <h1>Register</h1>
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
                    <FormField
                        title='Email'
                        type='email'
                        name='email'
                        onChange={handleInput}
                        error={errors.email}
                    />
                    <input type="submit" value="Register" />
                    <div className='error-message'>
                        { error }
                    </div>
                    <div className='register-link-wrapper'>
                        <span>Don't have an account? </span>
                        <Link to='/login' className='register-link'>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}