import React, { useState, useRef } from 'react';
import Input from './../../../Common/Input/Input';

const EditProfile = (props) => {
    const { profile } = props;

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
        console.log(formData);
    }

    return (
        <div>
            <h4>Edit Profile</h4>
            <form className="form" onSubmit={handleSubmit}>
                <Input
                    divClassNames={
                        "form-field-wrapper fname-wrapper"
                    }
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
                    divClassNames={
                        "form-field-wrapper lname-wrapper"
                    }
                    isAutoFocus={true}
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="lastName"
                    labelClassName="placeholder"
                    labelTextValue="Lastname"
                />
                <Input
                    divClassNames={
                        "form-field-wrapper uname-wrapper"
                    }
                    isAutoFocus={true}
                    value={formData.userName}
                    onChange={handleChange}
                    onFocus={handleChange}
                    type="text"
                    nameAndId="userName"
                    labelClassName="placeholder"
                    labelTextValue="Username"
                />
                <Input
                    divClassNames={
                        "form-field-wrapper uname-wrapper"
                    }
                    isAutoFocus={true}
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