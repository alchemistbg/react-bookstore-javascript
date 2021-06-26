import React, { Fragment } from 'react'

const PersonalTab = (props) => {
    const { profile } = props

    function handleEditProfile() {
        console.log('Edit user profile')
    }

    return <Fragment>
        <input className="input" type="radio" name="tabs" id="tab-1" defaultChecked />
        <div className="ilabel">
            <label className="label" htmlFor="tab-1">Personal</label>
            <div className="triangle"></div>
        </div>

        <div className="panel">

            <h4 className="header">Personal information</h4>

            <div className="personal-info">
                <table className="info-table">
                    <tbody>
                        <tr>
                            <td><h6 className="user-name">username:</h6></td>
                            <td><h6><span>{profile.userName}</span></h6></td>
                        </tr>
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

        </div>

    </Fragment>;
}

export default PersonalTab;