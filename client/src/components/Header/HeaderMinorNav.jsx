import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderMinorNav = () => {
    const test = () => {
        // console.log("Check")
    }
    return (
        <ul className="minor-nav-list">
            <li>
                <NavLink to="/books" onClick={test()}>Books</NavLink>
            </li>
            {/* <li>
                <NavLink to="/books">Books</NavLink>
            </li>
            <li>
                <NavLink to="/books">Books</NavLink>
            </li> */}
            {/* <li>
                <NavLink to="/contacts">Contacts</NavLink>
                </li>
                <li>
                <NavLink to="/contacts">Contacts</NavLink>
            </li> */}
        </ul>
    );
}

export default HeaderMinorNav;