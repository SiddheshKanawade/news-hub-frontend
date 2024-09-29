const baseUrl = 'https://interested-cyndia-siddheshorg-cfa870e6.koyeb.app';

async function getAggregatedNews(apiURL, keyWords, selectedSources) {
    try {
        // Make the POST request
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "keyWords": keyWords,
                "sources": selectedSources
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();

        return data['results'];
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error while calling news aggregator:', error);
    }

}

async function getLiveNews() {
    const selectedSources = ['bloomberg', 'indiatimes', 'the-economic-times', 'businesstoday', 'reuters'];
    const categories = ['general', 'business'];
    console.log('Fetching Live News');
    try {
        const apiURL = `${baseUrl}/news/live`;
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sources": selectedSources,
                "categories": categories
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();

        // Call Hindu, if calling with previous sources, then it returns less data for bloomberg and others as the data is caped at 100
        let response_second = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sources": ['the-hindu'],
                "categories": ['business']
            })
        });

        console.log(data);

        let data_second = {};

        if (response_second.ok) {
            data_second = await response_second.json();
            let updatedData = data['results'].concat(data_second['results']);
            // Sort updatedData by publishedAt from latest to oldest
            updatedData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            console.log(updatedData);
            return updatedData;
        } else {
            return data['results'];
        }




    } catch (error) {
        console.error('Error fetching Live News:', error);
    }
}

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

export { getAggregatedNews, getLiveNews, timeDifference };