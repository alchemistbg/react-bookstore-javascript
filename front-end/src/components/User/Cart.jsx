import React, { Fragment, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';

import AuthContext from './../../context/authContext/AuthContext';
import CartContext from './../../context/cartContext/CartContext';

import { postOrder } from '../../services/requests';

import { showToast } from '../../utils/helpers';

const Cart = (props) => {
    const [{ isLoggedIn, userName, userId }] = useContext(AuthContext);

    const [{ cart }, dispatch] = useContext(CartContext);

    const handleRemoveFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART'
        })
    }

    const handleCheckout = () => {
        dispatch({
            type: 'CHECKOUT'
        })
        let totalPrice = 0;
        cart.map((book) => {
            return totalPrice += book.price;
        });
        const bookIds = cart.map(book => {
            return book._id;
        });
        const requestData = {
            customer: userId,
            orderedBooks: bookIds,
            totalPrice
        }
        postOrder(requestData)
            .then((response) => {
                showToast('success', {
                    title: response.data.message,
                    // message: `You will be now redirected to home page.`
                });
            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    let totalPrice = 0;
    return (
        document.title = "Reactive Bookstore | Cart",
        <Fragment>
            {
                !isLoggedIn ? (
                    <div>
                        return <Redirect to='/login' />
                    </div>
                ) : (
                        <Fragment>
                            <h2 className="cart-header">Your shopping bag, {userName}</h2>
                            {
                                cart.length !== 0 ? (
                                    <div>
                                        <table className="cart-list">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {
                                                cart.map((cartItem) => {
                                                    totalPrice += cartItem.price;
                                                    return <tbody>
                                                        <tr key={cartItem._id}>
                                                            <td>{cartItem.title}</td>
                                                            <td>{cartItem.price}</td>
                                                            <td><button className="form-button" onClick={handleRemoveFromCart}>Remove</button></td>
                                                        </tr>
                                                    </tbody>
                                                    // <li key={cartItem._id} className="cart-item">
                                                    //     {cartItem.name}
                                                    //     <button className="form-button" onClick={handleRemoveFromCart}>Remove</button>
                                                    // </li>
                                                })
                                            }
                                        </table>
                                        {
                                            <div className="total-price-wrapper">
                                                <div className="class">
                                                    Total Price: <span className="total-price">{totalPrice}</span>
                                                </div>
                                                <input className="form-button" type="button" value="CheckOut" onClick={handleCheckout} />
                                            </div>
                                        }

                                    </div>
                                ) : (
                                        <h4>Your cart is empty</h4>
                                    )
                            }

                        </Fragment>
                    )

            }
        </Fragment >
    );
}

export default Cart;
