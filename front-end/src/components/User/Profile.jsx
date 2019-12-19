import React, { Fragment, useState, useEffect } from 'react'

import { getUserProfile } from '../../services/requests';

const Profile = (props) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        getUserProfile('qwertasd')
            .then((userProfile) => {
                setProfile(userProfile.data.user);
                console.log(userProfile.data.user)
            })
            .catch((error) => {
                console.log(error.response)
            });
    }, []);

    return (
        <Fragment>
            <h2>Profile page of {profile.fullName}</h2>
            <h4 className="header">Personal info</h4>
            <div className="personal-info">
                <p className="first-name">First Name: <span>{profile.firstName}</span></p>
                <p className="last-name">Last Name: <span>{profile.lastName}</span></p>
            </div>
            <h4 className="header">Orders info</h4>
            <div className="orders-info">
                <div className="order-item">

                </div>
            </div>
            <h4 className="header">Comments info</h4>
            {/* <h4 className="header">Orders info</h4> */}

        </Fragment>
    );
}

export default Profile;