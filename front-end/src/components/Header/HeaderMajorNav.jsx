import React, { Fragment, useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom';

import AuthContext from './../../context/authContext/AuthContext';
import CartContext from './../../context/cartContext/CartContext';

function HeaderMajorNav() {
    const [{ isLoggedIn, userName }, dispatch] = useContext(AuthContext);
    const [{ cart }] = useContext(CartContext);

    useEffect(() => {

        checkIsLogged()
            .then((response) => {
                console.log(response);
                const decodedToken = jwt(response.data.token);
                dispatch({
                    type: "CHECK_IF_LOGGED",
                    payload: {
                        userName: decodedToken.userName,
                        userId: decodedToken.userId,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
        return;
    }, [])

    const handleLogOut = () => {
        dispatch({
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
                    <li>
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
                )}
        </ul>
    );
}

export default HeaderMajorNav;