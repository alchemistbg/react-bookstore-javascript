import React from 'react';

import logo from './../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Logo = (props) => {

    return (
        <span className={`site-logo ${props.display}`}>
            <NavLink to='/'>
                <img src={logo} alt="" />
            </NavLink>
        </span>
    )
}

export default Logo;
