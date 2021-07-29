import React from 'react';

const Hamburger = (props) => {
    return (
        <div className="hamburger" onClick={props.clicked}></div>
    )
}

export default Hamburger;