import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Set state for hamburger

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='navBar'>
            <div>
                <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
                    <h1>PRaZo</h1>
                </a>
            </div>

            <div className='hamburgerWrapper'>
                {/* Hamburger icon */}
                <div className='hamburger' onClick={toggleMenu}>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                </div>

                {/* Navigation items */}
                <ul className={`navItems ${isOpen ? 'show' : ''}`}>
                    <li><a href="/feed" className='navItem'>Your Feed</a></li>
                    <li><a href="/ticker" className='navItem'>Tikr News</a></li>
                    <li><a href="/keysearch" className='navItem'>Keyword Search</a></li>
                </ul>
            </div>
            {/* Search bar */}
            <div className='searchBar'>
                <input type='text' placeholder='Search News' value="" onChange={""} />
                <button>Search</button>
            </div>
        </nav>
    )
}

export default Navbar