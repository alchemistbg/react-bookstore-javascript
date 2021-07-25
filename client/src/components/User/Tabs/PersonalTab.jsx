import React, { Fragment } from 'react';

import EditProfile from './Edit/EditProfile';
import EditPassword from './Edit/EditPassword';

const PersonalTab = (props) => {
    const { profile, handleEditProfile, toEditProfile, handleEditPassword, toEditPassword, handleCancel } = props;

    let snippet = "";
    if (toEditProfile === true && toEditPassword === false) {
        console.log("edit profile");
        snippet = <EditProfile profile={profile}
            handleEditProfile={handleEditProfile}
            toEditProfile={toEditProfile}
            handleEditPassword={handleEditPassword}
            toEditPassword={toEditPassword}
            handleCancel={handleCancel} />
    } else if (toEditProfile === false && toEditPassword === true) {
        console.log("edit password");
        snippet = <EditPassword profile={profile}
            handleEditProfile={handleEditProfile}
            toEditProfile={toEditProfile}
            handleEditPassword={handleEditPassword}
            toEditPassword={toEditPassword}
            handleCancel={handleCancel} />
    }
    else if (toEditProfile === false && toEditPassword === false) {
        snippet = <div className="personal-info">
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
                        <td><h6 className="user-name">User name:</h6></td>
                        <td><h6><span>{profile.userName}</span></h6></td>
                    </tr>
                    <tr>
                        <td><h6 className="email">Email: </h6></td>
                        <td><h6><span>{profile.email}</span></h6></td>
                    </tr>
                </tbody>
            </table>
            <input className="form-button edit-profile" type="button" value="Edit profile" onClick={handleEditProfile} />
            <input className="form-button change-password" type="button" value="Change Password" onClick={handleEditPassword} />
        </div>
    }

    return <Fragment>
        <input className="input" type="radio" name="tabs" id="tab-1" defaultChecked />
        <div className="ilabel">
            <label className="label" htmlFor="tab-1">Personal</label>
            <div className="triangle"></div>
        </div>

        <div className="panel">

            <h2 className="header">Personal information</h2>

            {snippet}

        </div>

    </Fragment>;
}

export default PersonalTab;