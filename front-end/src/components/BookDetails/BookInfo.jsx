import React, { useState, useContext, useReducer } from 'react'
// import { Redirect } from 'react-router-dom';

import Quantity from './../Common/Quantity/Quantity';

import { showToast } from '../../utils/helpers';

import AuthContext from './../../context/authContext/AuthContext';
import CartContext from './../../context/cartContext/CartContext';

function BookInfo(props) {
    const { book } = props;
    let [bookQty, setBookQty] = useState(1);
    book.qty = bookQty;

    const [{ isLoggedIn }] = useContext(AuthContext);

    const [{ cart }, dispatch] = useContext(CartContext);

    const handleDecrement = () => {
        if (bookQty > 1) {
            bookQty -= 1;
            setBookQty(bookQty);
        }
        console.log(bookQty);
    }

    const handleIncrement = () => {
        bookQty += 1;
        setBookQty(bookQty);
        console.log(bookQty);
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
                item: props.book
            });
        }
    }

    return (
        <div className="book-info">
            <h4>{book.title}</h4>
            <table>
                <tbody>
                    <tr>
                        <td className="column-header">Author:</td>
                        <td className="column-data">{book.author}</td>
                    </tr>
                    <tr>
                        <td className="column-header">Publisher:</td>
                        <td className="column-data">{book.publisher}</td>
                    </tr>
                    <tr>
                        <td className="column-header">Categories: </td>
                        <td className="column-data">

                            {
                                book.genres.map((genre, index) => {
                                    if (index < book.genres.length - 1) {
                                        return <span key={genre._id}>{genre.name}, </span>;
                                    }
                                    return <span key={genre._id}>{genre.name}</span>;
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
                    // handleDecrement={() => handleDecrement(book)}
                    // handleDecrement={() => handleDecrement(book)}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                />
                <input className="form-button" type="button" value="Add to cart" onClick={handleAddToCartClick} />
            </span>
        </div>
    );
}

export default BookInfo;