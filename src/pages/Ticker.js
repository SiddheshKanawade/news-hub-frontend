import Choices from "choices.js";
import React, { useEffect, useState, useRef } from 'react'
import { loadTickersFromCSV } from '../utils/helper'
import TickerCategory from "../Components/Category";
import { getTickerNews } from "../utils/get_news";
import Card from "../Components/Card";

// Debounce function to limit the rate at which a function can fire
const useDebounce = (func, wait) => {
    const timeoutRef = useRef(null);

    const debouncedFunc = (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => func(...args), wait);
    };

    return debouncedFunc;
};

export default function Ticker() {
    // State
    const [tickers, setTickers] = useState([]);
    const [newsData, setNewsData] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [choicesInstance, setChoicesInstance] = useState(null); // Ref for the Choices.js instance
    const selectRef = useRef(null); // Ref for the select DOM element
    const [isLoading, setIsLoading] = useState(true);


    const initializeChoices = async () => {
        const tickerData = await loadTickersFromCSV();

        setTickers(tickerData); // Asynchronous call

        if (tickerData.length > 0) {
            const initialTickers = tickerData.slice(0, 100); // Initial load of first 100 tickers

            // If an instance of Choices already exists, destroy it before reinitializing
            if (choicesInstance) {
                choicesInstance.destroy();
            }

            const choices = new Choices(selectRef.current, {
                searchEnabled: true,
                searchResultLimit: 10,
                maxItemCount: 1,
                placeholderValue: 'Select tickers...',
                shouldSort: true,
                fuseOptions: {
                    includeScore: true,
                    threshold: 0.3,
                },
                removeItemButton: true,
                renderChoiceLimit: 10,
            });


            // Populate initial choices
            initialTickers.forEach(ticker => {
                choices.setChoices([{ value: ticker['NAME OF COMPANY'], label: ticker['NAME OF COMPANY'] }], 'value', 'label', false);
            });

            setChoicesInstance(choices);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const ticker = selectRef.current.value;

        if (ticker === '') {
            alert('Please select a ticker');
            return;
        }
        if (selectedCategories.length === 0) {
            alert('Please select at least one category');
            return;
        }
        const data = await getTickerNews(ticker, selectedCategories);
        if (data.length === 0) {
            alert(`No news found for the ticker: ${ticker}`);
        }
        setNewsData(data);
        setIsLoading(false);
    };

    // Debounce search functionality
    const debouncedSearch = useDebounce((searchTerm) => {
        const filteredTickers = tickers.filter(ticker =>
            ticker['NAME OF COMPANY']?.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        // Clear and repopulate choices based on search
        choicesInstance.clearStore();
        filteredTickers.slice(0, 100).forEach(ticker => {
            choicesInstance.setChoices([{ value: ticker['NAME OF COMPANY'], label: ticker['NAME OF COMPANY'] }], 'value', 'label', false);
        });
    }, 2000);

    // This function will be called whenever the selected categories change
    const handleCategoriesChange = (categories) => {
        setSelectedCategories(categories);
    };

    useEffect(() => {
        initializeChoices();
    }, []);

    useEffect(() => {
        const handleSearch = (event) => {
            const searchTerm = event.detail.value.trim();
            if (searchTerm !== '') {
                debouncedSearch(searchTerm);
            }
        };

        // Attach search event listener
        selectRef.current.addEventListener('search', handleSearch);

        return () => {
            // Cleanup: Remove event listener on unmount
            selectRef.current.removeEventListener('search', handleSearch);
        };
    }, [debouncedSearch]);


    return (
        <div className="tickerNews">
            <div className="tickerForm search-container">
                <div className="tickerSelect">
                    <label htmlFor="tickers">Select Ticker:</label>
                    <select ref={selectRef} id="tickers" multiple placeholder="Select tickers..."></select>
                </div>

                <TickerCategory onCategoriesChange={handleCategoriesChange} />

                <button className="submitButton" onClick={handleSubmit}>Submit</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} isLoading={isLoading} /> : null}
            </div>
        </div>
    )
}