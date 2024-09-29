import { showCategories, getTickerNews, renderCards } from "./utils/ticker.mjs";

const selectElement = document.getElementById('tickers');
const choices = new Choices(selectElement, {
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
    renderChoiceLimit: 100,
});



// Function to fetch and parse the CSV file
async function loadTickersFromCSV() {
    try {
        const response = await fetch('static/nse.csv'); // Replace with actual CSV file path
        const csvText = await response.text();

        // Use PapaParse to parse the CSV data
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,  // Assuming the CSV has headers like "NAME OF COMPANY"
                dynamicTyping: true,
                complete: (results) => {
                    resolve(results.data);  // This will give an array of objects from CSV
                },
                error: (error) => reject(error),
            });
        });
    } catch (error) {
        console.error('Error loading CSV file:', error);
        return [];
    }
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to initialize the Choices.js select box
async function initializeTickerSelect() {
    const tickers = await loadTickersFromCSV();

    // Use a debounced search handler
    const debouncedAddChoices = debounce((searchTerm) => {
        const filteredTickers = tickers.filter(ticker => {
            if (ticker['NAME OF COMPANY'] !== undefined) {
                return ticker['NAME OF COMPANY'].toLowerCase().startsWith(searchTerm.toLowerCase())
            }
            return false;
        }
        );

        // Clear current choices
        choices.clearStore();

        if (filteredTickers.length > 100) {
            const initialTickers = filteredTickers.slice(0, 100);
            initialTickers.forEach(ticker => {
                choices.setChoices([{ value: ticker['NAME OF COMPANY'], label: ticker['NAME OF COMPANY'] }], 'value', 'label', false);
            });
        } else {
            // Add filtered tickers in batches
            filteredTickers.forEach(ticker => {
                choices.setChoices([{ value: ticker['NAME OF COMPANY'], label: ticker['NAME OF COMPANY'] }], 'value', 'label', false);
            });
        }

    }, 2000);


    // Listen for input events to filter choices
    selectElement.addEventListener('search', (event) => {
        const searchTerm = event.detail.value.trim();
        if (searchTerm !== '') {
            debouncedAddChoices(event.detail.value);
        }

    });

    // Initially load a subset of choices
    const initialTickers = tickers.slice(0, 100);  // Load the first 100 tickers
    initialTickers.forEach(ticker => {
        choices.setChoices([{ value: ticker['NAME OF COMPANY'], label: ticker['NAME OF COMPANY'] }], 'value', 'label', false);
    });
}

export async function handleSubmit() {
    let ticker = document.getElementById('tickers').value;
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

// Initialize the select box after the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTickerSelect);
document.addEventListener('DOMContentLoaded', showCategories);


window.handleSubmit = handleSubmit;
