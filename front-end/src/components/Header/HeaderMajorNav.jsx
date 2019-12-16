import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

function HeaderMajorNav() {
    return (
        <ul className="major-nav-list">
            {!true ? (
                <Fragment>
                    <li>
                        <NavLink to="/profile">Welcome, Unufri</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">My Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout">Logout</NavLink>
                    </li>
                </Fragment>
            ) : (
                    <Fragment>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </Fragment>
                )}
        </ul>
    );
}

export default HeaderMajorNav;