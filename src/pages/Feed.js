import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { getFeedNews } from '../utils/get_news';
import Card from '../Components/Card';

export default function Feed() {
    const [newsData, setNewsData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //  Token may not be valid
    const getData = async (token) => {
        const dt = await getFeedNews(token);
        setNewsData(dt);
    }

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You need to login first');
            return <Navigate to="/login" />;
        }

        setAuthToken(token);
        getData(token);
        setIsLoading(false);
    }, [])

    // In case of invalid token, send back to login page

    // Token validation would be done in the backend and based on error code, we send back
    return (
        <div>
            {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}
        </div>
    )
}