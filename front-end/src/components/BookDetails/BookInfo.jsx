import React, { useContext, useReducer } from 'react'
// import { Redirect } from 'react-router-dom';
import { showToast } from '../../utils/helpers';

import AuthContext from './../../context/authContext/AuthContext';

import CartContext from './../../context/cartContext/CartContext';
// import { initialCartState, cartReducer } from '../../reducers/cartReducer';

function BookInfo(props) {
    const [{ isLoggedIn }] = useContext(AuthContext);

    const [{ cart }, dispatch] = useContext(CartContext);

    const handleDecrement = () => {
        if (bookQty > 1) {
            bookQty -= 1;
            setBookQty(bookQty);
        }
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

    const { book } = props;
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
            <div>
                <span className="qty-wrapper">
                    <button className="form-button e">
                        <i className="far fa-minus-square"></i>
                    </button>
                    1
                    <button className="form-button e">
                        <i className="far fa-plus-square"></i>
                    </button>
                </span>
            </div>
            <input className="form-button" type="button" value="Add to cart" onClick={handleAddToCartClick} />
        </div>
    );
}

export default BookInfo;