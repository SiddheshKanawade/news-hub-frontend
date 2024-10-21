import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            navigate('/signup');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
