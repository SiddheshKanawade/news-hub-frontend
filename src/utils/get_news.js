import { getDateRange } from './helper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Error from '../Components/InternalServerError';

async function getLiveNews(category) {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const selectedSources = ['bloomberg', 'indiatimes', 'the-economic-times', 'businesstoday', 'reuters', 'the-hindu', 'bbc', 'cnbc', 'google-news'];
    try {
        const apiURL = `${baseUrl}/news/live`;
        console.log(`Fetching Live News for category: ${category}`);
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sources": selectedSources,
                "categories": category ? [category] : ['business']
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();

        return data['results'];

    } catch (error) {
        console.error('Error fetching Live News:', error);
    }
}

async function getTickerNews(ticker, selectedCategories) {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const { formattedStartDate, formattedEndDate } = getDateRange(); // NEVER USED!!!

    try {
        let response = await fetch(`${baseUrl}/news/ticker`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "keyWords": [ticker],
                "categories": selectedCategories,
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();

        return data['results'];

    } catch (error) {
        console.error('Error fetching Ticker News:', error);
    }
}

async function getFeedNews(token) {
    const baseUrl = process.env.REACT_APP_BASEURL;
    try {
        const response = await axios.post(`${baseUrl}/user/feed`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data['results'];
    } catch (resp) {
        console.error('Error fetching Feed News:', resp.status);
        if (resp.status === 401) {
            localStorage.removeItem('authToken');
            alert('You need to login first');
            return <Navigate to="/login" />;
        }

        console.error('Error fetching Feed News:', resp);

        return (
            <div>
                <Error />
            </div>
        );


    }
}

export { getLiveNews, getTickerNews, getFeedNews };