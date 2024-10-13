export default async function getLiveNews(category) {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const selectedSources = ['bloomberg', 'indiatimes', 'the-economic-times', 'businesstoday', 'reuters', 'the-hindu', 'bbc', 'cnbc', 'google-news'];
    try {
        const apiURL = `${baseUrl}/news/live`;
        console.log(`Fetching Live News for category: ${category}`);
        let response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sources": selectedSources,
                "categories": category ? [category] : ['business']
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return [];
        }
        let data = await response.json();

        if (data['results'].length === 0) {
            alert(`No news found for the category: ${category}`);
        }
        return data['results'];

    } catch (error) {
        console.error('Error fetching Live News:', error);
    }
}