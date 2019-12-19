import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { timeFormat } from '../../utils/helpers';
import { getUserProfile } from '../../services/requests';

import AuthContext from './../../context/authContext/AuthContext';

const Profile = (props) => {
    const [profile, setProfile] = useState({});
    const [{ isLoggedIn, userName, error }, dispatch] = useContext(AuthContext);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getUserProfile(userName)
            .then((userProfile) => {
                setProfile(userProfile.data.user);
                setComments(userProfile.data.user.comments);
            })
            .catch((error) => {
                // console.log(error.response);
            });
    }, []);

    function handleEditProfile() {
        // console.log(props)
    }

    return (
        // {
        //     isLoggedIn ? () : ()
        // }
        <div className="profile-wrapper">
            <h2>Profile page of {profile.fullName}</h2>
            <h4 className="header">Personal info</h4>
            <div className="personal-info">
                <table className="info-table">
                    <tbody>
                        <tr>
                            <td><h6 className="first-name">First Name:</h6></td>
                            <td><h6><span>{profile.firstName}</span></h6></td>
                        </tr>
                        <tr>
                            <td><h6 className="last-name">Last Name: </h6></td>
                            <td><h6><span>{profile.lastName}</span></h6></td>
                        </tr>
                        <tr>
                            <td><h6 className="email">Email: </h6></td>
                            <td><h6><span>{profile.email}</span></h6></td>
                        </tr>
                    </tbody>
                </table>




                <input className="form-button" type="button" value="Edit profile" onClick={handleEditProfile} />
            </div>

            <h4 className="header">Orders info</h4>
            <div className="orders-info">
                <div className="order-item">

                </div>
            </div>

            <h4 className="header">Comments info</h4>
            <div className="comments-info">
                <ul className="comments-list">
                    {
                        comments.map((comment) => {
                            return <li key={comment._id} className="comment-item">
                                <div className="commented-object">
                                    concerning <span className="highlighted"><Link to={`/books/${comment.bookCommented._id}`}>{comment.bookCommented.title}</Link></span>
                                </div>
                                <div className="comment-meta">
                                    <span className="comment-time">on {timeFormat(comment.commentTime)} </span>
                                    <span className="comment-author">YOU wrote:</span>
                                </div>
                                <div className="comment-content">
                                    {comment.commentContent}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>

        </div>
    );
}

export default Profile;