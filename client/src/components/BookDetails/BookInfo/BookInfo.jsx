import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Quantity from './../../Common/Quantity/Quantity';

import { showToast } from './../../../utils/helpers';

import UserContext from './../../../context/userContext/UserContext';
import CartContext from './../../../context/cartContext/CartContext';
import { useRef } from 'react';

const BookInfo = (props) => {
    let [bookQty, setBookQty] = useState(1);

    let bookRef = useRef(props.book);
    let book = bookRef.current;
    book.qty = bookQty;

    useEffect(() => {
        book = bookRef.current;
        book.qty = bookQty;
        return () => {
            book = bookRef.current;
        }
    }, [bookRef.current])

    const [{ isLoggedIn, userId }] = useContext(UserContext);

    const [{ cart }, dispatch] = useContext(CartContext);

    const handleDecrement = () => {
        if (bookQty > 1) {
            bookQty -= 1;
            setBookQty(bookQty);
        }
    }

    const handleOnClick = () => {
        console.log("Link clicked!");
    };

    const handleIncrement = () => {
        bookQty += 1;
        setBookQty(bookQty);
    }

    const handleAddToCartClick = () => {
        if (!isLoggedIn) {
            props.history.push('/login');
        } else {
            showToast('success', {
                title: `${props.book.title} added successfully to your cart.`
            });
            dispatch({
                type: 'ADD_TO_CART',
                item: props.book,
                userId
            });
            book.qty = bookQty;
        }
    }

    return (
        <div className="book-info">
            <h4>{book.title}</h4>
            <table>
                <tbody>
                    <tr>
                        <td className="column-header">Author:</td>
                        <td className="column-data"><NavLink to='TBA' onClick={handleOnClick}>{book.author}</NavLink></td>
                    </tr>
                    <tr>
                        <td className="column-header">Publisher:</td>
                        <td className="column-data">{book.publisher}</td>
                    </tr>
                    <tr>
                        <td className="column-header">Categories:</td>
                        <td className="column-data">
                            {
                                book.genres.map((genre, index) => {
                                    const genreName = genre.name;
                                    if (index < book.genres.length - 1) {
                                        return <NavLink key={genre._id} to={`genres/${genre.name}`}>{genreName}, </NavLink>;
                                    }
                                    return <NavLink key={genre._id} to={`genres/${genre.name}`}>{genreName}</NavLink>;
                                })
                            }

                        </td>
                    </tr>
                    <tr>
                        <td className="column-header">ISBN:</td>
                        <td className="column-data">{book.isbn}</td>
                    </tr>
                    <tr>
                        <td className="column-header">Price:</td>
                        <td className="column-data">{book.price}$</td>
                    </tr>
                </tbody>
            </table>
            <span className="qty-wrapper">
                <Quantity
                    book={book}
                    qty={book.qty}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                />
                <input className="form-button" type="button" value="Add to cart" onClick={handleAddToCartClick} />
            </span>
        </div>
    );
}

export default BookInfo;