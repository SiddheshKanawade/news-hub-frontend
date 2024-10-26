import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import addFeedSources from '../utils/sources';

export default function FeedSource() {
    const navigate = useNavigate();

    const sources = [
        { display: 'Bloomberg', value: 'bloomberg' },
        { display: 'India Times', value: 'indiatimes' },
        { display: 'The Economic Times', value: 'the-economic-times' },
        { display: 'Business Today', value: 'business-today' },
        { display: 'Financial Times', value: 'financialtimes' },
        { display: 'The New York Times', value: 'nytimes' },
        { display: 'Reuters', value: 'reuters' },
        { display: 'The Hindu', value: 'the-hindu' },
        { display: 'BBC', value: 'bbc' },
        { display: 'CNBC', value: 'cnbc' },
        { display: 'Google News', value: 'google-news' },
        { display: 'Times of India', value: 'times-of-india' },
        { display: 'The Guardian', value: 'the-guardian' },
        { display: 'Financial Express', value: 'financial-express' },
        { display: 'NDTV', value: 'ndtv' },
        { display: 'Forbes', value: 'forbes' },
        { display: 'TechCrunch', value: 'techcrunch' },
        { display: 'CNN', value: 'cnn' },
        { display: 'Al Jazeera', value: 'al-jazeera' },
        { display: 'The Wall Street Journal', value: 'the-wall-street-journal' },
        { display: 'Fox News', value: 'fox-news' },
        { display: 'USA Today', value: 'usa-today' }
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
