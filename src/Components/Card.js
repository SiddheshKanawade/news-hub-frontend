import React from 'react';
import timeDifference from '../utils/ticker';

const Card = ({ data }) => {

    const readMore = (url) => {
        window.open(url);
    }



    return (
        <div className='cardContainer'>
            {data?.length > 0 ? data.map((curItem, index) => {
                return (
                    <div key={index} className='card'>
                        {/* Optional chaining to prevent errors when fields are missing */}
                        <img src={curItem?.urlToImage || '/placeholder_thumbnail.png'} alt="News thumbnail" />
                        <div className='content'>
                            {/* Handle undefined title */}
                            <a className='title' onClick={() => readMore(curItem?.url)}>
                                {curItem?.title || 'No Title Available'}
                            </a>
                            {/* Handle undefined description */}
                            <p>{curItem?.description || 'No Description Available'}</p>
                            {/* Handle undefined source */}
                            <p><b>Source: <i>{curItem?.source || 'Unknown Source'}</i></b></p>
                            {/* Handle undefined published date and apply timeDifference */}
                            <p>Published: {curItem?.publishedAt}</p>
                            <button onClick={() => readMore(curItem?.url)}>Read More</button>
                        </div>
                    </div>
                );
            }) : (
                <p>No news available at the moment.</p>
            )}
        </div>
    );
}

export default Card;
