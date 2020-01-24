import React, { useState } from 'react';

import BookList from './BookList';
import Sidebar from './Sidebar';

function BookListView(props) {
    const [genre, setGenre] = useState('');

    function handleClick(event) {
        const selectedGenre = event.currentTarget.innerText;
        setGenre(selectedGenre);
    }

    return <div className="book-list-container">
        <Sidebar {...props} onClick={handleClick} />
        <BookList {...props} genre={genre} />
    </div>
}

export default BookListView;