import React, { useEffect, useState, useRef } from 'react';
import Card from '../Components/Card';
import { getLiveNews } from '../utils/get_news';
import GeneralCategory from '../Components/GeneralCategory';
import Spinner from '../Components/Spinner'
import debounce from 'lodash.debounce';

const Newsapp = () => {
    const [category, setCategory] = useState("general");
    const [newsData, setNewsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const cacheRef = useRef({});

    const CACHE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

    const getData = async (category) => {
        const currentTime = Date.now();

        // Check if category exists in cache and is within the timeout period
        if (cacheRef.current[category] && currentTime - cacheRef.current[category].timestamp < CACHE_TIMEOUT) {
            setNewsData(cacheRef.current[category].data);
            setIsLoading(false);
            return;
        }

        // Fetch new data if cache is outdated or non-existent
        setIsLoading(true);
        const dt = await getLiveNews(category);
        setNewsData(dt);

        // Update cache with new data and current timestamp
        cacheRef.current[category] = { data: dt, timestamp: currentTime };
        setIsLoading(false);
    };

    useEffect(() => {
        getData(category);
    }, [category]);

    const handleCategoryChange = debounce((cat) => {
        setCategory(cat);
    }, 300);

    return (
        <div>
            <div>
                <p className="head">All your News in a Single Feed</p>
            </div>
            <GeneralCategory onCategoriesChange={handleCategoryChange} />
            <div>
                {isLoading ? <Spinner /> : <Card data={newsData} />}
            </div>
        </div>
    );
};

export default Newsapp;
