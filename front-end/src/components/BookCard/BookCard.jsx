import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { getBookCover } from '../../services/requests';
import Donut from '../Common/Preloader/Donut';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            book: this.props.book,
            bookCover: null
        }
    }

    async componentDidMount() {
        const { isbn } = this.state.book
        const cover = await getBookCover(isbn, 'M')

        this.setState({
            bookCover: cover,
            isLoading: false
        });
    }

    render() {
        const { isLoading, book, bookCover } = this.state;

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
                            </div>
                        )
                }
                <div className="book-meta">
                    <div className="book-title">{book.title}</div>
                </div>
                <div className="book-footer">
                    <div className="book-author">from <span>{book.author}</span></div>
                    <div className="book-price">Price: <span>{book.price}$</span></div>
                </div>
            </Link>
        </div >
    }
}

export default Book;
