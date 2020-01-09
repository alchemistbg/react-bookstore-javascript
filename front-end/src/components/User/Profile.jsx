import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ProfileTab from './ProfileTab';
import OrdersTab from './OrdersTab';
import CommentsTab from './CommentsTab';

// import { timeFormat } from '../../utils/helpers';
import { getUserProfile, getOrders } from '../../services/requests';

import AuthContext from './../../context/authContext/AuthContext';

const Profile = (props) => {
    const [{ isLoggedIn, userName, userId, error }, dispatch] = useContext(AuthContext);

    const [profile, setProfile] = useState({});
    const [orders, setOrders] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getUserProfile(userName)
            .then((userProfile) => {
                setProfile(userProfile.data.user);
                setComments(userProfile.data.user.comments);
            })
            .catch((error) => {
            });
    }, []);

    useEffect(() => {
        getOrders(userId)
            .then((userOrders) => {
                setOrders(userOrders.data.orders);
            })
            .catch((error) => {
                console.log(error.response)
            });
    }, []);

    // function handleEditProfile() {
    // }

    return (
        document.title = "Reactive Bookstore | Profile",
        <Fragment>
            {
                isLoggedIn ?
                    (
                        <div className="profile-wrapper">

                            <h2>Profile page of {profile.fullName}</h2>

                            <div class="tabs">
                                <ProfileTab profile={profile} />
                                <OrdersTab orders={orders} />
                                <CommentsTab comments={comments} />
                            </div>

                        </div>
                    ) : (
                        <div>
                            return <Redirect to='/login' />
                        </div>
                    )
            }
        </Fragment>
    );
}

export default Profile;