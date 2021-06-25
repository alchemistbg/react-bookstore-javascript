import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import PersonalTab from './Tabs/PersonalTab';
import OrdersTab from './Tabs/OrdersTab';
import CommentsTab from './Tabs/CommentsTab';

import { getUserProfile, getOrders } from '../../requests/userRequests';

import UserContext from './../../context/userContext/UserContext';

const Profile = () => {
    console.log("Profile");
    const [{ isLoggedIn, userName, userId, error }, dispatch] = useContext(UserContext);

    const [profile, setProfile] = useState({});
    const [orders, setOrders] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getUserProfile(userId)
            .then((userProfile) => {
                console.log("Profile: ", userProfile.data);
                setProfile(userProfile.data.user);
                setComments(userProfile.data.user.comments);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getOrders(userId)
            .then((userOrders) => {
                // console.log(userOrders);
                setOrders(userOrders.data.orders);
            })
            .catch((error) => {
                // console.log(error.response)
            });
    }, []);

    // const handleCheck = (event) => {
    //     console.log('radio was checked');
    //     console.log(event.target.name, event.target.id, event.target.checked);
    // }

    return (
        document.title = "Reactive Bookstore | Profile",
        <Fragment>
            {
                isLoggedIn ?
                    (
                        <div className="profile-wrapper">

                            <h2>Profile page of {profile.fullName}</h2>

                            <div className="tabs">
                                <PersonalTab profile={profile} />
                                {/* <ProfileTab profile={profile} onCheck={handleCheck} /> */}
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