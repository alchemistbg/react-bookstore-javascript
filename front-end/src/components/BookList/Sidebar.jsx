import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import { getGenres } from '../../services/requests';

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
            <h3>Sidebar</h3>
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