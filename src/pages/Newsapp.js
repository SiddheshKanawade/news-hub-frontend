import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import { getLiveNews } from '../utils/get_news'

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
        console.log(e.target.value);
        setCategory(e.target.value)

    }
    const userInput = (event) => {
        setCategory(event.target.value);
        getData(event.target.value);
    }

    return (
        <div>
            <div>
                <p className='head'>All your News in single Feed</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="general">General</button>
                <button onClick={userInput} value="business">Business</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="science">Science</button>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="technology">Technology</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}

            </div>
        </div>
    )
}

export default Newsapp