import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getBookCover } from './../../requests/bookRequests';
import Donut from './../Common/Preloader/Donut';

const BookCard = (props) => {

    const book = props.book;
    const [isLoading, setIsLoading] = useState(true);
    const [bookCover, setBookCover] = useState(null);

    useEffect(() => {
        getBookCover(book.isbn, 'M')
            .then((cover) => {
                setBookCover(cover);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return <div className='book-item'>
        <Link className="book-link" to={{ pathname: `/books/${book._id}`, state: { book } }} >
            <div className="details"></div>
            {
                isLoading ? (
                    <div className="card-loader">
                        <Donut />
                    </div>
                ) : (
                    <div className="book-cover">
                        <img className="img" src={bookCover} alt={book.title} />
                        {/* <img className="img" src={bookCover} alt={book.title} crossorigin="anonymous" /> */}
                    </div>
                )
            }
            <div className="book-meta">
                <h6 className="book-title">{book.title}</h6>
            </div>
            <div className="book-footer">
                <div className="book-author">from <span>{book.author}</span></div>
                <div className="book-price">Price: <span>{book.price}$</span></div>
            </div>
        </Link>
    </div >
}

export default BookCard;