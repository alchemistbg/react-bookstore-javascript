import React from 'react';
import { Link } from 'react-router-dom';

import BookTableHeader from './BookTableHeader';

const BookTable = (props) => {
    return <ul className="book-list-table">
        <BookTableHeader key={"header"} source={props.source} />
        {
            props.bookTable.map((book) => {
                // console.log(book)
                return <li key={book._id._id || book._id} className="book-list-item data-row">
                    <span className="book-list-item-title">
                        <Link to={"books/" + (book._id._id || book._id)}>
                            {book._id.title || book.title}
                        </Link>
                    </span>
                    <span className="book-list-item-sprice">
                        {book._id.price || book.price}
                    </span>
                    {
                        props.source === "cart" ? (
                            <span className="book-list-item-qty">
                                {
                                    book.qty < 2 ? (
                                        <button className="form-button book-table" disabled>
                                            <i className="far fa-minus-square"></i>
                                        </button>
                                    ) : (
                                            <button className="form-button book-table" onClick={() => props.handleDecrement(book)}>
                                                <i className="far fa-minus-square"></i>
                                            </button>
                                        )
                                }
                                {book.qty}
                                <button className="form-button book-table" onClick={() => props.handleIncrement(book)}>
                                    <i className="far fa-plus-square"></i>
                                </button>
                            </span>
                        ) : (
                                <span className="book-list-item-qty">
                                    {book.qty}
                                </span>
                            )
                    }
                    <span className="book-list-item-tprice">
                        {book._id.totalPrice || book.totalPrice}
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