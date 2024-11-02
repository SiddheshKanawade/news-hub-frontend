import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { getFeedNews } from '../utils/get_news';
import Card from '../Components/Card';
import GeneralCategory from '../Components/GeneralCategory';

export default function Feed() {
    const [newsData, setNewsData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [category, setCategory] = useState("general");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getData = async (token, category) => {
        setNewsData(null);
        const dt = await getFeedNews(token, navigate, category);
        setNewsData(dt);
    }

    const handleCategoryChange = (cat) => {
        setCategory(cat);
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
        getData(token, category);
        setIsLoading(false);
    }, [navigate, category])

    return (
        <div>
            <div>
                <p className='head'>Customised Feed based on Selected Sources!</p>
            </div>
            <GeneralCategory onCategoriesChange={handleCategoryChange} />
            {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}
        </div>
    )
}