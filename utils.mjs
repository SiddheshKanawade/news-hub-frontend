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
    const selectedSources = ['bloomberg', 'indiatimes', 'the-economic-times', 'the-hindu'];
    const categories = ['business', 'technology'];
    try {
        const apiURL = `${baseUrl}/news/live`;
        console.log(JSON.stringify({
            "sources": selectedSources
        }))
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
        return data['results'];


    } catch (error) {
        console.error('Error fetching Live News:', error);
    }
}

export { getAggregatedNews, getLiveNews };