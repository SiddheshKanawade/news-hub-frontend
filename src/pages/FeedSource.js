import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import addFeedSources from '../utils/sources';

export default function FeedSource() {
    const navigate = useNavigate();

    const sources = [
        { display: 'Bloomberg', value: 'bloomberg' },
        { display: 'The Guardian', value: 'guardian' },
        { display: 'Business Today', value: 'businesstoday' },
        { display: 'Financial Times', value: 'financialtimes' },
        { display: 'The New York Times', value: 'nytimes' },
        { display: 'Reuters', value: 'reuters' },
        { display: 'The Hindu', value: 'the-hindu' },
        { display: 'BBC Future', value: 'bbc' },
        { display: 'CNBC', value: 'cnbc' },
        { display: 'Investing.com | Stock Market Quotes & Financial News', value: 'investing' },
        { display: 'Yahoo News', value: 'yahoo' },
        { display: 'Google News', value: 'google-news' },
        { display: 'CNN', value: 'cnn' },
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
