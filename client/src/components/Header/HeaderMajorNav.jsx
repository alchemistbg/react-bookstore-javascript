import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';

import { checkIsLogged, logoutUser } from './../../requests/userRequests';
import { getCart } from './../../requests/cartRequests';

import UserContext from './../../context/userContext/UserContext';
import CartContext from './../../context/cartContext/CartContext';
import jwt from 'jwt-decode';

function HeaderMajorNav() {
    const [{ isLoggedIn, userName, userId }, userDispatch] = useContext(UserContext);
    const [{ cart }, cartDispatch] = useContext(CartContext);

    useEffect(() => {
        console.log("Checking if user is logged in");
        checkIsLogged()
            .then((response) => {
                console.log(response.data);
                const decodedToken = jwt(response.data.token);
                userDispatch({
                    type: "CHECK_IF_LOGGED",
                    payload: {
                        userName: decodedToken.userName,
                        userId: decodedToken.userId,
                    },
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [userDispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("LOGGED IN as: ", userName);
            console.log("With userId: ", userId);
            getCart(userId)
                .then((response) => {
                    console.log(response.data.cart);
                    // if (response.data.cart.length > 0) {
                    cartDispatch({
                        type: 'LOAD_CART_FROM_DATABASE',
                        payload: {
                            ...response.data.cart[0]
                        }
                    });
                    // }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [cartDispatch, isLoggedIn, userName, userId]);

    // const handleOnLoad = () => {
    //     console.log("Loaded...");
    // }

    const handleLogOut = () => {
        // logoutUser()
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // <Redirect to='/' />
        userDispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <ul className="major-nav-list">
            {isLoggedIn ? (
                <Fragment>
                    <li>
                        <NavLink to="/profile">Welcome, {userName}</NavLink>
                    </li>
                    <li >
                        <NavLink to="/cart">
                            <i className="fas fa-shopping-cart">
                                <span className="cart-size">{cart.length}</span>
                            </i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" onClick={handleLogOut}>Logout</NavLink>
                    </li>
                </Fragment>
            ) : (
                <Fragment>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </Fragment>
            )
            }
        </ul >
    );
}

export default HeaderMajorNav;