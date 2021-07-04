import React, { Component, Fragment, useState, useEffect } from 'react'

import Donut from './../Common/Preloader/Donut';
import BookCard from './../BookCard/BookCard';
import Pagination from './../Common/Pagination/Pagination';

import { paginate } from './../../utils/paginate';
import { getBooks, getBooksByGenre } from './../../requests/bookRequests';

const BookList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [pageSize, setPageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getBooks()
            .then((response) => {
                setBooks(response.data.books);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const booksPage = paginate(books, currentPage, pageSize);
    let booksHTML = "";
    if (books.length === 0) {
        booksHTML = <Fragment>
            <h4>At the moment there are no books in our database.</h4>
            <p>This could be due to maintenance. Please, come back later.</p>
            <p>If you still this page and think this is wrong,
                feel free to contact us.</p>
        </Fragment>
    } else {
        booksHTML = <Fragment>
            <div className="container">
                <h2>Our books</h2>
                <ul className='book-list'>
                    {
                        booksPage.map((book) => {
                            return <li key={book._id}>
                                <BookCard book={book} />
                            </li>
                        })
                    }
                </ul>
                <Pagination
                    link={props.location}
                    itemsCount={books.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </Fragment>
    }

    return <Fragment>
        {
            isLoading ?
                <div className="book-list-loader">
                    <Donut />
                </div> : booksHTML
        }
    </Fragment>
};

export default BookList;