import axios from 'axios';


async function addFeedSources(sources, token, navigate) {
    const baseUrl = process.env.REACT_APP_BASEURL;

    try {
        console.log(sources);
        const response = await axios.post(
            `${baseUrl}/user/feed-sources`,
            sources,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 201) {
            console.log('Feed sources added successfully');
            navigate('/feed');
        }

    } catch (error) {
        console.error('Error adding Feed Sources:', error);
        if (error.response.status === 401) {
            console.log(`HTTP error! status: ${error.response.status}`);
            alert('Session timedout. Login again to continue');
            navigate('/login');
        } else if (error.request) {
            console.error('No response received:', error.request);
            navigate('/error');
        } else {
            console.error('Error adding Feed Sources:', error.message);
            navigate('/error');
        }
    }
}

export default addFeedSources;
