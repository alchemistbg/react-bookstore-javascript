import React, { useState } from 'react';
import Input from './../../../Common/Input/Input';

import { validateForm, validateInput } from "./../../../../utils/inputValidation";
import { showToast } from "./../../../../utils/helpers";
import { patchPassword } from './../../../../requests/userRequests';

const EditPassword = (props) => {
    // console.log(props.profile);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        repNewPassword: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        console.log(input);
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

        validateForm('changePass', formData)
            .then(() => {
                patchPassword(props.profile._id, formData)
                    .then((res) => {
                        showToast("success", {
                            title: "Well done!",
                            message: res.data.message,
                        });
                    }).catch((error) => {
                        console.log(error.response.data.info);
                        if (error.response.data.message === 'Incorrect user data!') {
                            showToast('error', error.response.data.info);
                        } else {
                            const toast = {
                                title: "Error",
                                message: error.response.data.message
                            };
                            showToast("simpleError", toast);
                        }
                    });
            })
            .catch((errors) => {
                showToast('error', errors)
            });

    }

    return (
        <div>
            <h4>Edit Password</h4>
            <form className="form" onSubmit={handleSubmit}>

                <Input
                    divClassNames={
                        "form-field-wrapper pass-wrapper"
                    }
                    isAutoFocus={true}
                    value={formData.oldPassword}
                    onChange={handleChange}
                    type="password"
                    nameAndId="oldPassword"
                    labelClassName="placeholder"
                    labelTextValue="Old password"
                />
                <Input
                    divClassNames={
                        "form-field-wrapper pass-wrapper"
                    }
                    isAutoFocus={false}
                    value={formData.newPassword}
                    onChange={handleChange}
                    type="password"
                    nameAndId="newPassword"
                    labelClassName="placeholder"
                    labelTextValue="New password"
                />
                <Input
                    divClassNames={
                        "form-field-wrapper pass-wrapper"
                    }
                    isAutoFocus={false}
                    value={formData.repNewPassword}
                    onChange={handleChange}
                    type="password"
                    nameAndId="repNewPassword"
                    labelClassName="placeholder"
                    labelTextValue="Repeat new password"
                />
                <button className="form-button apply" type="submit">Apply</button>
                <button className="form-button cancel" onClick={props.handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditPassword;