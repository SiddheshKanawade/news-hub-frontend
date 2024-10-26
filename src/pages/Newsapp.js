import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import { getLiveNews } from '../utils/get_news'
import GeneralCategory from '../Components/GeneralCategory'

const Newsapp = () => {
    const [category, setCategory] = useState("general");
    const [newsData, setNewsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async (category) => {
        const dt = await getLiveNews(category);
        setNewsData(dt);
    }

    useEffect(() => {
        setIsLoading(true);
        getData(category);
        setIsLoading(false);
    }, [])

    const handleInput = (e) => {
        "To implement search functionality"
        console.log(e.target.value);
        setCategory(e.target.value)

    }
    const handleCategoryChange = (cat) => {
        setCategory(cat);
    }

    useEffect(() => {
        setIsLoading(true);
        getData(category);
        setIsLoading(false);
    }, [category])

    return (
        <div>
            <div>
                <p className='head'>All your News in single Feed</p>
            </div>

            <GeneralCategory onCategoriesChange={handleCategoryChange} />
            <div>
                {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}

            </div>
        </div>
    )
}

export default Newsapp