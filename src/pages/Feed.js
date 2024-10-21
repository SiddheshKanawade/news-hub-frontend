import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { getFeedNews } from '../utils/get_news';
import Card from '../Components/Card';

export default function Feed() {
    const [newsData, setNewsData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getData = async (token) => {
        setNewsData(null);
        const dt = await getFeedNews(token, navigate);
        setNewsData(dt);
    }

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You need to login first');
            navigate('/login');  // Use navigate to redirect to login page
            return;
        }

        setAuthToken(token);
        getData(token);
        setIsLoading(false);
    }, [navigate])

    return (
        <div>
            {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}
        </div>
    )
}