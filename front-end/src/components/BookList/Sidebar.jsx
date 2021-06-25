import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import { getGenres } from '../../requests/bookRequests';

function Sidebar(props) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres()
            .then((genresResponse) => {
                setGenres(genresResponse.data.genres);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        < aside className="sidebar" >
            <h2>Select a category</h2>
            <ul className="sidebar-list">
                {
                    genres.map((genre) => {
                        return <li key={genre._id}>
                            <NavLink to={`/books/genres/${genre.name}`} onClick={props.onClick} >{genre.name}</NavLink>
                        </li>
                    })
                }
            </ul>
        </aside >
    );
}

export default Sidebar;