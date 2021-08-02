import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import jwt from 'jwt-decode';
import Hamburger from '../Common/Button/Hamburger';
import Logo from './../Logo/Logo';
import { checkIsLogged, logoutUser } from './../../requests/userRequests';
import { getCart } from './../../requests/cartRequests';
import HeaderMajorNav from './HeaderMajorNav';
import HeaderMinorNav from './HeaderMinorNav';
import HeaderSearchBar from './HeaderSearchBar'
import SideDrawer from './../SideDrawer/SideDrawer';

import { useWindowSize } from '../../utils/hooks';

import UserContext from './../../context/userContext/UserContext';
import CartContext from './../../context/cartContext/CartContext';
import NavigationItems from './../Common/NavigationItems/NavigationItems';

const Header = () => {

    const [toggleSideDrawer, setToggleSideDrawer] = useState(false);

    const [{ isLoggedIn, userName, userId }, userDispatch] = useContext(UserContext);
    const [{ cart }, cartDispatch] = useContext(CartContext);

    const toggleSideDrawerHandler = () => {
        setToggleSideDrawer(!toggleSideDrawer);
    }

    const closeSideDrawerHandler = () => {
        setToggleSideDrawer(!toggleSideDrawer);
    }

    useEffect(() => {
        checkIsLogged()
            .then((response) => {
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
                text: `Welcome, ${userName || null}!`
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

    const [pageWidth, pageHeight] = useWindowSize();
    if (pageWidth < 769) {
        menu.loggedFalse.unshift({
            class: '',
            link: '/books',
            text: 'Books'
        });

        menu.loggedTrue.unshift({
            class: '',
            link: '/books',
            text: 'Books'
        });
    }

    return (
        <header>
            <nav className='header-nav'>

                <Logo className={'desktop'} />

                <div className="header-rows">
                    <div className="first-row">
                        <Link to="/" className="link-logo">
                            <p className="logo">
                                <span className="reactive">Reactive</span> Bookstore
                            </p>
                        </Link>

                        <NavigationItems
                            className="major-nav-list"
                            {...(isLoggedIn ? { menu: menu.loggedTrue } : { menu: menu.loggedFalse })}
                        />
                    </div>

                    <span>Window size: {pageWidth} x {pageHeight}</span>

                    <div className="second-row">
                        <HeaderMinorNav />
                        <HeaderSearchBar />
                    </div>
                </div>


                <Hamburger clicked={toggleSideDrawerHandler} />
                <SideDrawer
                    toggle={toggleSideDrawer}
                    close={closeSideDrawerHandler}
                    {...(isLoggedIn ? { menu: menu.loggedTrue } : { menu: menu.loggedFalse })}
                />

            </nav>
        </header>
    );
}

export default Header;