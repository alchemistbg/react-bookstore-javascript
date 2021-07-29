import React, { Fragment, useContext, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';

import { checkIsLogged, logoutUser } from './../../requests/userRequests';
import { getCart } from './../../requests/cartRequests';

import UserContext from './../../context/userContext/UserContext';
import CartContext from './../../context/cartContext/CartContext';
import jwt from 'jwt-decode';
import NavigationItems from './../Common/NavigationItems/NavigationItems';

const HeaderMajorNav = (props) => {

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
            getCart(userId)
                .then((response) => {
                    cartDispatch({
                        type: 'LOAD_CART_FROM_DATABASE',
                        payload: {
                            ...response.data.cart[0]
                        }
                    });
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    }, [cartDispatch, isLoggedIn, userName, userId]);

    const handleLogOut = () => {
        userDispatch({
            type: 'LOGOUT'
        });
    }

    const menu = {
        loggedTrue: [
            {
                class: '',
                link: '/profile',
                text: `Welcome, ${userName || null}`
            },
            {
                class: '',
                link: '/cart',
                text: 'cart',
                size: `${cart.length || 0}`
            },
            {
                class: '',
                link: '/logout',
                text: 'Logout',
                clicked: { handleLogOut }

            }
        ],

        loggedFalse: [
            {
                class: '',
                link: '/login',
                text: 'Login'

            },
            {
                class: '',
                link: '/register',
                text: 'Register'
            }
        ]
    }
    return (
        <>
            {
                isLoggedIn ? (
                    <NavigationItems className="major-nav-list" menu={menu.loggedTrue} />
                ) : (
                    <NavigationItems className="major-nav-list" menu={menu.loggedFalse} />
                )
            }

        </>
    );
}

export default HeaderMajorNav;