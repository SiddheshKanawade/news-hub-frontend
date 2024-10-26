import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { isLoggedIn } from '../utils/get_news';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const baseUrl = process.env.REACT_APP_BASEURL;
        try {
            const response = await axios.post(`${baseUrl}/user/register`, {
                username,
                password,
                email
            });

            console.log(response);

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError('Signup failed. Please try again.');
            if (err.status === 409) {
                setError('User already exists. Please login.');
                alert('User already exists. Please login.');
                navigate('/login');
            }
        }
    };

    const checkLogged = async () => {
        const status = await isLoggedIn(localStorage.getItem('authToken'));
        setIsLogged(status);
        return status;
    }

    useEffect(() => {
        if (isLogged) {
            alert('You are already logged in');
            navigate('/');
        }
    }, [isLogged]);

    useEffect(() => {
        checkLogged();
    }, []);

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <form onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className='btn' type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
