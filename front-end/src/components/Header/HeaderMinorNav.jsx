import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderMinorNav() {
    return (
        <ul className="minor-nav-list">
            <li>
                <NavLink to="/books">Books</NavLink>
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