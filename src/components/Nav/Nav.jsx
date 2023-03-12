import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './Nav.css'


function Nav(props) {

    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token")
        setLoggedIn(false)
    };

    const [click] = useState(false);


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    AIDtravel
                    <i className='fab fa-typo3' />
                </Link>
                <div className='menu-icon'>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        {loggedIn &&
                            <Link
                                to="/donate"
                                className='nav-links'
                            >Donate
                            </Link>}
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/'
                            className='nav-links'
                        >
                            Projects
                        </Link>
                    </li>
                </ul>
                <div>
                    {!loggedIn && <Link to="/login" className="btn">Login</Link>}
                    {loggedIn && <button onClick={handleClick} className="btn--outline">Log Out</button>}
                </div>

            </div>
        </nav>
    );

}

export default Nav;