const baseUrl = 'https://interested-cyndia-siddheshorg-cfa870e6.koyeb.app';

import { timeDifference } from './helper.mjs';


// Initialize the Choices.js instance
const choices = new Choices('#category', {
    delimiter: ',',
    editItems: true,
    removeItemButton: true,
    placeholderValue: 'Select categories...',
    searchEnabled: true,  // Enables the search functionality
});


async function getTickerNews(formData) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    console.log('Fetching Ticker News');

    const selectedCategories = choices.getValue(true);

    // Subtract 30 days
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Format the dates
    const formattedStartDate = thirtyDaysAgo.toISOString().split('T')[0];
    const formattedEndDate = today.toISOString().split('T')[0];

    const apiURL = `${baseUrl}/news/live?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

    try {
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "keyWords": [formData.ticker],
                "categories": selectedCategories
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();
        console.log(data['total']);
        return data['results'];


    } catch (error) {
        console.error('Error fetching Live News:', error);
    }
}

// Fetch sources from backend and set choices as predefined tags
async function showCategories() {
    try {

        const categories = ['business', 'technology', 'entertainment', 'general', 'health', 'science', 'sports'];

        // Populate Choices.js with fetched options
        choices.setChoices(categories.map(category => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1)
        })), 'value', 'label', true);

    } catch (error) {
        console.error('Error fetching sources:', error);
    }
}

// Function to render the cards based on ticker data
async function renderCards(data) {
    const cardsContainer = document.getElementById('cards-container-ticker');
    cardsContainer.innerHTML = ''; // Clear previous cards
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4><b>${item.title}</b></h4>
            <p>${item.description}</p>
            <p><b>Source: <i>${item.source}</i></b></p>
            <p>Published: ${timeDifference(item.publishedAt)}</p> <!-- Use timeDifference function here -->
            <a href="${item.url}" target="_blank">Read More</a>
        `;
        cardsContainer.appendChild(card);
    });
}

export { renderCards, getTickerNews, showCategories };