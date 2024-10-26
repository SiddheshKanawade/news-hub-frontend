import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { isLoggedIn } from '../utils/get_news';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const baseUrl = process.env.REACT_APP_BASEURL;
        try {
            const apiURL = `${baseUrl}/user/token`;
            const response = await axios.post(apiURL, {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem('authToken', token);
                console.log('Login successful');
                navigate('/');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            alert('Login failed. Please signup.');
            navigate('/signup');
        }
    };


    useEffect(() => {
        if (isLoggedIn(localStorage.getItem('authToken'))) {
            alert('You are already logged in');
            navigate('/');
        }
    }, []);

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className='custom'>Welcome to the PRaZo! Please log in to access custom feed, made just for you.</p>
                    <label>
                        Email:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className='btn' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
