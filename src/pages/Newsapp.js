import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { getLiveNews } from '../utils/get_news';
import GeneralCategory from '../Components/GeneralCategory';
import Spinner from '../Components/Spinner'
import debounce from 'lodash.debounce';

const Newsapp = () => {
    const [category, setCategory] = useState("general");
    const [newsData, setNewsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cache, setCache] = useState({});

    const getData = async (category) => {
        if (cache[category]) {
            setNewsData(cache[category]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const dt = await getLiveNews(category);
        setNewsData(dt);
        setCache((prevCache) => ({ ...prevCache, [category]: dt }));
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
                <p className='head'>All your News in single Feed</p>
            </div>
            <GeneralCategory onCategoriesChange={handleCategoryChange} />
            <div>
                {newsData ? <Card data={newsData} isLoading={isLoading} /> : <Spinner />}

            </div>
        </div>
    );
};

export default Newsapp;
