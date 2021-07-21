import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const FooterNavigation = (params) => {
    return (
        <Fragment>
            <div>
                <h6>Logo</h6>
                <ul>
                    <li>
                        <NavLink to="/project">About this project</NavLink>
                    </li>
                    <li>
                        <NavLink to=""></NavLink>
                    </li>
                    <li>
                        <NavLink to=""></NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <h6>Reactive Bookstore</h6>
                <ul className="footer-nav-list">
                    <li>
                        <NavLink to="/about">About us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacts">Contacts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/careers">Careers</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <h6>Join</h6>
                <ul>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <h6>FAQs</h6>
                <ul>
                    <li>Membership</li>
                    <li>Order</li>
                    <li>Payment</li>
                    <li>Shipping</li>
                </ul>
            </div>
        </Fragment>
    );
}

export default FooterNavigation;