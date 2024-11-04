import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
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
    const navigate = useNavigate();

    const getData = useCallback(async (token, category) => {
        setIsLoading(true);

        // Check if data for this category is already cached in sessionStorage
        const cachedData = sessionStorage.getItem(`newsData_${category}`);
        if (cachedData) {
            setNewsData(JSON.parse(cachedData));
            setIsLoading(false);
            return;
        }

        // If not cached, fetch from API
        const dt = await getFeedNews(token, navigate, category);
        setNewsData(dt);

        // Cache the data in sessionStorage
        sessionStorage.setItem(`newsData_${category}`, JSON.stringify(dt));
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
            {newsData ? <Card data={newsData} isLoading={isLoading} /> : <Spinner />}
        </div>
    );
}
