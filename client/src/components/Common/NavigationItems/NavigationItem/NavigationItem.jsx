import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {

    return <li>
        <NavLink to={props.link}
            onClick={
                props.clicked ? props.clicked.handleLogOut : null
            }
        >
            {props.text}
        </NavLink>
    </li>
}

export default NavigationItem
