import React, { Fragment, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';

import UserContext from './../../context/userContext/UserContext';
import CartContext from './../../context/cartContext/CartContext';

import BookTable from './../Common/BookTable/BookTable';
import { showToast, calcCartTotalSum } from './../../utils/helpers';

import { postOrder } from './../../requests/userRequests';
import { deleteCart } from './../../requests/cartRequests';

const Cart = (props) => {
    const [{ isLoggedIn, userName, userId }] = useContext(UserContext);

    const [{ cart }, cartDispatch] = useContext(CartContext);
    console.log(cart);

    const handleDecrement = (book) => {
        cartDispatch({
            type: 'DECREMENT',
            item: book
        });
    }

    const handleIncrement = (book) => {
        cartDispatch({
            type: 'INCREMENT',
            item: book
        });
    }

    const handleRemoveFromCart = (book) => {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            item: book,
            userId
        });
    }

    const handleCheckout = () => {
        // console.log(cart);
        cartDispatch({
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
                price: book.price,
                totalPrice: book.totalPrice
            };
        });

        const requestData = {
            customerId: userId,
            orderedBooks,
            orderTotalPrice: totalPrice * 100 / 100
        }

        postOrder(requestData)
            .then((response) => {
                showToast('success', {
                    title: response.data.message,
                    // message: `You will be now redirected to home page.`
                });
                return deleteCart(userId)
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
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
