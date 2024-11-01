import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import addFeedSources from '../utils/sources';

export default function FeedSource() {
    const navigate = useNavigate();

    const sources = [
        { display: 'Bloomberg', value: 'bloomberg' },
        { display: 'The Times of India', value: 'The Times of India' },
        { display: 'Live Mint', value: 'mint' },
        { display: 'Money Control', value: 'Moneycontrol' },
        { display: 'The Economic Times', value: 'The Economic Times' },
        { display: 'Al Jazeera', value: 'Al Jazeera' },
        { display: 'The Hindu', value: 'The Hindu' },
        { display: 'AP News', value: 'AP News' },
        { display: 'The Print', value: 'ThePrint' },
        { display: 'The Indian Express', value: 'The Indian Express' },
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
