import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';

function NotFound(props) {
    const requestedUrl = props.location.pathname.slice(1);

    return (
        document.title = 'Page not found',
        <div className="not-found">
            <div className="top">
                <span className="left">
                    <h1>404</h1>
                </span>

                <span className="right">
                    <h4>Page Not Found!</h4>
                </span>
            </div>


            <div className="bottom">
                <p>
                    You are here, because you have requested the following non-existing resource:
                </p>
                <h5>{process.env.REACT_APP_BASE_URL}/{requestedUrl}</h5>
                <NavLink to="/">
                    <img src="./logo.png" alt="" />
                    <h3>GO BACK</h3>
                </NavLink>
            </div>
        </div>

    );
}
export default NotFound;