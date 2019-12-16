import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

function FooterNavigation(params) {
    return (
        <Fragment>
            <div>
                <h6>Logo</h6>
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
                        <NavLink to="/about">Carrier</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <h6>Join</h6>
                <div>Login</div>
                <div>Register</div>
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