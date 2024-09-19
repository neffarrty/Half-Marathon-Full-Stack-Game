import { useState } from 'react';
import '../../styles/Login.css';

export default function Login() {
    const [input, setInput] = useState({
        username: '',
        password: '',
    });
    
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
          //dispatch action from hooks
        }

        alert("please provide a valid input");
      };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
    };
    
    return (
        <>
            <h1>Login</h1>
            <form action="">
                <div className='form-content'>
                    <label>
                        <span>Username</span>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleInput}
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleInput} 
                        />
                    </label>
                    <a href='#' className='reset-link'>Forgot password</a>
                    <input type="submit" value="Login" />
                    <div>Don't have an account? <a href='#' className='register-link'>Register</a></div>
                </div>
            </form>
        </>
    );
};