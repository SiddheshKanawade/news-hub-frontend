import { getTickerNews, showCategories, renderCards } from './utils/ticker.mjs';

export async function handleSubmit() {
    let ticker = document.getElementById('currency').value;
    // const selectedCategories = choices.getValue(true);
    // Create the form data object
    const formData = {
        ticker,
    };


    // Call custom function and handle the response
    const response = await getTickerNews(formData);
    if (response.length === 0) {
        alert('No news found with the given criteria');
        return;
    }
    renderCards(response);
    // Adjust layout after cards are rendered
    const formContainer = document.querySelector('.form-container');
    const cardsContainer = document.getElementById('cards-container-ticker');

    // Reveal cards container and shift form to the left
    cardsContainer.classList.remove('hidden');
    cardsContainer.classList.add('visible');
}

// Fetch and populate sources on page load
showCategories();

window.handleSubmit = handleSubmit;