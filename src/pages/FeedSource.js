import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import addFeedSources from '../utils/sources';

export default function FeedSource() {
    const navigate = useNavigate();

    const sources = [
        { display: 'Bloomberg', value: 'bloomberg' },
        { display: 'The Economic Times', value: 'the-economic-times' },
        { display: 'Business Today', value: 'businesstoday' },
        { display: 'Financial Times', value: 'financialtimes' },
        { display: 'Investing.com | Stock Market Quotes &amp; Financial News', value: 'investing' },
        { display: 'The New York Times', value: 'nytimes' },
        { display: 'Reuters', value: 'reuters' },
        { display: 'The Hindu', value: 'the-hindu' },
        { display: 'BBC', value: 'bbc' },
        { display: 'CNBC', value: 'cnbc' },
        { display: 'Yahoo News', value: 'yahoo' },
        { display: 'Google News', value: 'google-news' },
        { display: 'Times of India', value: 'indiatimes' },
        { display: 'The Guardian', value: 'guardian' },
        { display: 'Financial Express', value: 'financialexpress' },
        { display: 'NDTV', value: 'ndtv' },
        { display: 'Forbes', value: 'forbes' },
        { display: 'CNN', value: 'cnn' },
        { display: 'Al Jazeera', value: 'aljazeera' },
        { display: 'Fox News', value: 'foxnews' },
    ];

    const [selectedSources, setSelectedSources] = useState([]);

    const handleSourceChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedSources([...selectedSources, value]); // Add source
        } else {
            setSelectedSources(selectedSources.filter((source) => source !== value)); // Remove source
        }
    };

    const handleSubmit = () => {
        addFeedSources(selectedSources, localStorage.getItem('authToken'), navigate);
    };

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <form>
                    <h1>Define Your Feed</h1>
                    <div className='feeds'>
                        {sources.map((source, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={source.value} // Use the 'value' field as the selected value
                                        onChange={handleSourceChange}
                                    />
                                    {source.display} {/* Display the human-readable name */}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className='btn' type="button" onClick={handleSubmit}>Submit</button>
                </form>


            </div>
        </div>
    );
}
