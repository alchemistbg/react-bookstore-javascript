import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import HeaderMajorNav from './HeaderMajorNav';
import HeaderMinorNav from './HeaderMinorNav';
import HeaderSearchBar from './HeaderSearchBar'

function Header() {
    return (
        <header>
            <nav className='header-nav'>
                <div className="first-row">
                    <Link to="/" className="link-logo">
                        <p className="logo">
                            <span className="reactive">Reactive</span> Bookstore
                        </p>
                    </Link>
                    <HeaderMajorNav />
                </div>
                <div className="second-row">
                    <HeaderMinorNav />
                    <HeaderSearchBar />
                </div>
            </nav>
        </header>
    );
}

export default Header;