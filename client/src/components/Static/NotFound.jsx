import React, { Fragment } from 'react'
// import { Link } from 'react-router-dom';

function NotFound(props) {
    const requestedUrl = props.location.pathname.slice(1);

    return (
        document.title = 'Page not found',
        <div className="not-found">
            <div className="left">
                <h1>404</h1>
            </div>

            <div className="right">
                <h1>Not found!</h1>
            </div>

            <div className="middle">
                <p>
                    You are here, because you have requested the following non-existing resource:
                </p>
                <h6>{process.env.REACT_APP_BASE_URL}/{requestedUrl}</h6>

            </div>
        </div>

    );
}
export default NotFound;