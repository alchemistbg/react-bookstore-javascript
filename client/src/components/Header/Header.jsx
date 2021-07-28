import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import HeaderMajorNav from './HeaderMajorNav';
import HeaderMinorNav from './HeaderMinorNav';
import HeaderSearchBar from './HeaderSearchBar'

const Header = () => {
    return (
        <header>
            <nav className='header-nav'>

                <Logo display={'desktop'} />

                <div className="header-rows">
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
                </div>

            </nav>
        </header>
    );
}

export default Header;