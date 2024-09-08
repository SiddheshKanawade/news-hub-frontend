import { getCryptoNews, timeDifference } from './utils.mjs';
// Initialize the Choices.js instance
const choices = new Choices('#category', {
    delimiter: ',',
    editItems: true,
    removeItemButton: true,
    placeholderValue: 'Select categories...',
    searchEnabled: true,  // Enables the search functionality
});

// Function to render the cards based on response data
async function renderCards(data) {
    const cardsContainer = document.getElementById('cards-container-crypto');
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


export async function handleSubmit() {
    let currency = document.getElementById('currency').value;
    const selectedCategories = choices.getValue(true);
    // Create the form data object
    const formData = {
        currency,
        selectedCategories
    };


    // Call custom function and handle the response
    const response = await getCryptoNews(formData);
    if (response.length === 0) {
        alert('No news found with the given criteria');
        return;
    }
    console.log(response);
    renderCards(response);
    // Adjust layout after cards are rendered
    const formContainer = document.querySelector('.form-container');
    const cardsContainer = document.getElementById('cards-container-crypto');

    // Reveal cards container and shift form to the left
    cardsContainer.classList.remove('hidden');
    cardsContainer.classList.add('visible');
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

// Fetch and populate sources on page load
showCategories();

window.handleSubmit = handleSubmit;