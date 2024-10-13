import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import Navbar from '../Components/Navbar';
import getLiveNews from '../utils/ticker'

const Newsapp = () => {
    const [category, setCategory] = useState("business");
    const [newsData, setNewsData] = useState(null)
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    const getData = async (category) => {
        const dt = await getLiveNews(category);
        setNewsData(dt);
    }

    useEffect(() => {
        getData(category);
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
                {newsData ? <Card data={newsData} /> : null}

            </div>
        </div>
    )
}

export default Newsapp