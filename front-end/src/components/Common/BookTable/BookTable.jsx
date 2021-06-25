import React from 'react';
import { Link } from 'react-router-dom';

import BookTableHeader from './BookTableHeader';

import Quantity from './../Quantity/Quantity';

const BookTable = (props) => {

    const books = props.bookTable;

    return <ul className="book-list-table">
        <BookTableHeader key={"header"} source={props.source} />
        {
            books.map((book) => {

                const bookSinglePrice = book._id.price || book.price;
                const bookTotalPrice = book._id.totalPrice || book.totalPrice;

                return <li key={book._id._id || book._id} className="book-list-item data-row">
                    <span className="book-list-item-title">
                        <Link to={"books/" + (book._id._id || book._id)}>
                            {book._id.title || book.title}
                        </Link>
                    </span>
                    <span className="book-list-item-sprice">
                        {/* {book._id.price || book.price} */}
                        {bookSinglePrice.toFixed(2)}
                    </span>
                    {
                        props.source === "cart" ? (
                            <Quantity
                                book={book}
                                handleDecrement={props.handleDecrement}
                                handleIncrement={props.handleIncrement}
                            />
                        ) : (
                            <span className="book-list-item-qty">
                                {book.qty}
                            </span>
                        )
                    }
                    <span className="book-list-item-tprice">
                        {/* {book._id.totalPrice || book.totalPrice} */}
                        {
                            bookTotalPrice.toFixed(2)
                        }
                    </span>
                    {
                        props.source === "cart" ? (
                            <span className="book-list-item-delete">
                                <button className="form-button button-delete" onClick={() => props.handleRemoveFromCart(book)}>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </span>
                        ) : (null)
                    }
                </li>
            })
        }
    </ul>
};

export default BookTable;