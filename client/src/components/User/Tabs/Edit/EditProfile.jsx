import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import Input from './../../../Common/Input/Input';
import { patchUserProfile } from './../../../../requests/userRequests';
import { validateForm } from '../../../../utils/inputValidation';
import { showToast } from '../../../../utils/helpers';

const EditProfile = (props) => {
    const { profile } = props;

    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        userName: profile.userName,
        email: profile.email
    });

    const handleChange = ({ currentTarget: input }) => {
        if (input.value) {
            input.className = "filled-input";
        } else {
            input.className = "";
        }

        setFormData((formData) => ({
            ...formData,
            [input.name]: input.value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm('editProfile', formData)
            .then(() => {
                patchUserProfile(profile._id, formData)
                    .then((res) => {
                        history.push('/profile');
                        showToast('success', {
                            title: "Well done!",
                            message: res.data.message
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                            if (error.response.data.message === 'Incorrect user data!') {
                                showToast('error', error.response.data.info);
                            } else {
                                const toast = {
                                    title: "Error",
                                    message: error.response.data.message
                                };
                                showToast("simpleError", toast);
                            }
                        }
                    })

            }).catch((errors) => {
                console.log(errors);
                showToast('error', errors)
            });
    }

    return (
        <div>
            <h4>Edit Profile</h4>
            <form className="form" onSubmit={handleSubmit}>
                <Input
                    divClassNames={"form-field-wrapper fname-wrapper"}
                    inputClassNames={"filled-input"}
                    isAutoFocus={true}
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="firstName"
                    labelClassName="placeholder"
                    labelTextValue="Firstname"
                />
                <Input
                    divClassNames={"form-field-wrapper lname-wrapper"}
                    inputClassNames={"filled-input"}
                    isAutoFocus={false}
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="lastName"
                    labelClassName="placeholder"
                    labelTextValue="Lastname"
                />
                <Input
                    divClassNames={"form-field-wrapper uname-wrapper"}
                    inputClassNames={"filled-input"}
                    isAutoFocus={false}
                    value={formData.userName}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="userName"
                    labelClassName="placeholder"
                    labelTextValue="Username"
                />
                <Input
                    divClassNames={"form-field-wrapper uname-wrapper"}
                    inputClassNames={"filled-input"}
                    isAutoFocus={false}
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="email"
                    labelClassName="placeholder"
                    labelTextValue="Email"
                />
                <button className="form-button apply" type="submit">Apply</button>
                <button className="form-button cancel" onClick={props.handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfile;