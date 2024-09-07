// Your function that returns a list of items
import { getLiveNews } from './utils.mjs';

// Function to calculate time difference
function timeDifference(publishedAt) {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffInMs = now - publishedDate; // Difference in milliseconds

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
    }
}

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
    console.log(list);
    const cardContainer = document.getElementById('card-container');
    list.forEach(item => {
        console.log(item);
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