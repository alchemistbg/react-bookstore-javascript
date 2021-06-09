import React, { Fragment, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/authContext/AuthContext';
import CartContext from '../../context/cartContext/CartContext';

import BookTable from '../Common/BookTable/BookTable';
import { showToast, calcCartTotalSum } from '../../utils/helpers';

import { postOrder } from '../../requests/userRequests';

const Cart = (props) => {
    const [{ isLoggedIn, userName, userId }] = useContext(AuthContext);

    const [{ cart }, dispatch] = useContext(CartContext);

    const handleDecrement = (book) => {
        dispatch({
            type: 'DECREMENT',
            item: book
        });
    }

    const handleIncrement = (book) => {
        dispatch({
            type: 'INCREMENT',
            item: book
        });
    }

    const handleRemoveFromCart = (book) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            item: book
        });
    }

    const handleCheckout = () => {
        dispatch({
            type: 'CHECKOUT'
        })

        let totalPrice = 0;
        cart.map((book) => {
            totalPrice += +book.totalPrice;
            return totalPrice;
        });

        const orderedBooks = cart.map(book => {
            return {
                _id: book._id,
                qty: book.qty,
                totalPrice: book.totalPrice
            };
        });

        const requestData = {
            customer: userId,
            orderedBooks,
            totalPrice: totalPrice * 100 / 100
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
                                <div className="cart-wrapper">
                                    <BookTable
                                        source="cart"
                                        bookTable={cart}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                        handleCheckout={handleCheckout}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}
                                    />
                                    {
                                        <div className="total-price-wrapper">
                                            Total Price:<span className="total-price">{calcCartTotalSum(cart).toFixed(2)}</span>
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
