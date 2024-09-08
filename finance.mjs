// Your function that returns a list of items
import { getLiveNews, timeDifference } from './utils.mjs';



// Function to create card HTML structure
function createCard(item) {
    return `
    <div class="card">
        <div class="card-body">
            <h4><b>${item.title}</b></h4>
            <p>${item.description}</p>
            <p><b>Source: <i>${item.source}</i></b></p>
            <p>Published: ${timeDifference(item.publishedAt)}</p> <!-- Use timeDifference function here -->
            <a href="${item.url}" target="_blank">Read More</a>
        </div>
    </div>`;
}

// Function to display the list in cards
async function displayList() {
    const list = await getLiveNews();
    const cardContainer = document.getElementById('card-container');
    list.forEach(item => {
        const cardHTML = createCard(item);
        cardContainer.innerHTML += cardHTML; // Append the card to the container
    });
}

// Call the displayList function when the page loads
window.onload = displayList;
// Load the navbar dynamically
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));