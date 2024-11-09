import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getFeedNews } from '../utils/get_news';
import Card from '../Components/Card';
import GeneralCategory from '../Components/GeneralCategory';
import Spinner from '../Components/Spinner'
import debounce from 'lodash.debounce';

export default function Feed() {
    const [newsData, setNewsData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [category, setCategory] = useState("general");
    const [isLoading, setIsLoading] = useState(false);
    const cacheRef = useRef({});
    const navigate = useNavigate();

    const CACHE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

    const getData = useCallback(async (token, category) => {
        const currentTime = Date.now();

        // Check if category exists in cache and is within the timeout period
        if (cacheRef.current[category] && currentTime - cacheRef.current[category].timestamp < CACHE_TIMEOUT) {
            setNewsData(cacheRef.current[category].data);
            setIsLoading(false);
            return;
        }

        // If not cached, fetch from API
        setIsLoading(true);
        const dt = await getFeedNews(token, navigate, category);
        setNewsData(dt);

        // Cache the data in sessionStorage
        cacheRef.current[category] = { data: dt, timestamp: currentTime };
        setIsLoading(false);
    }, [navigate]);

    const handleCategoryChange = debounce((cat) => {
        setCategory(cat);
    }, 300);

    // Separate useEffect for initial authentication check
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You need to login first');
            navigate('/login');
            return;
        }

        setAuthToken(token);
    }, [navigate]);

    // Fetch data whenever the category changes and there's a valid auth token
    useEffect(() => {
        if (authToken) {
            getData(authToken, category);
        }
    }, [authToken, category, getData]);

    return (
        <div>
            <div>
                <p className='head'>Customised Feed based on Selected Sources!</p>
            </div>
            <GeneralCategory onCategoriesChange={handleCategoryChange} />
            <div>
                {isLoading ? <Spinner /> : <Card data={newsData} />}
            </div>
        </div>
    );
}
