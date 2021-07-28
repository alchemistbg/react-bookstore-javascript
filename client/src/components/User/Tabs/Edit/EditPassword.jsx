import React, { Fragment, useState } from 'react';
import Input from './../../../Common/Input/Input';

// import { history } from 'react-router-dom';

import { validateForm, validateInput } from "./../../../../utils/inputValidation";
import { showToast } from "./../../../../utils/helpers";
import { patchPassword } from './../../../../requests/userRequests';
import { useHistory } from 'react-router-dom';

const EditPassword = (props) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        repNewPassword: ""
    });

    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showRepNewPassword, setShowRepNewPassword] = useState(true);

    const handleHideOldPassword = (inputRef, showPassRef) => {
        console.log(inputRef);
        console.log(showPassRef);
        setShowOldPassword(!showOldPassword);
        if (showOldPassword) {
            inputRef.current.type = 'text';
            showPassRef.current.classList.add('show-pass');
            showPassRef.current.classList.remove('hide-pass');
        } else {
            inputRef.current.type = 'password';
            showPassRef.current.classList.remove('show-pass');
            showPassRef.current.classList.add('hide-pass');
        }
    };

    const handleHideNewPassword = (inputRef, showPassRef) => {
        // console.log(inputRef);
        setShowNewPassword(!showNewPassword);
        if (showNewPassword) {
            inputRef.current.type = 'text';
            showPassRef.current.classList.add('show-pass');
            showPassRef.current.classList.remove('hide-pass');
        } else {
            inputRef.current.type = 'password';
            showPassRef.current.classList.remove('show-pass');
            showPassRef.current.classList.add('hide-pass');
        }
    };

    const handleHideRepNewPassword = (inputRef, showPassRef) => {
        // console.log(inputRef);
        setShowRepNewPassword(!showRepNewPassword);
        if (showRepNewPassword) {
            inputRef.current.type = 'text'
            showPassRef.current.classList.add('show-pass');
            showPassRef.current.classList.remove('hide-pass');
        } else {
            inputRef.current.type = 'password'
            showPassRef.current.classList.remove('show-pass');
            showPassRef.current.classList.add('hide-pass');
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        // console.log(input);
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

        validateForm('editPassword', formData)
            .then(() => {
                patchPassword(props.profile._id, formData)
                    .then((res) => {
                        history.push('./profile');
                        setFormData({
                            oldPassword: "",
                            newPassword: "",
                            repNewPassword: ""
                        });
                        showToast("success", {
                            title: "Well done!",
                            message: res.data.message,
                        })
                    }).catch((error) => {
                        console.log(error);
                        if (error.response) {
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
                    });
            })
            .catch((errors) => {
                console.log(errors);
                showToast('error', errors)
            });

    }

    return (
        <Fragment>
            <h4 className="form-header">Edit Password</h4>
            <div id="change-pass-form">
                <form
                    className="form change-pass-form"
                    onSubmit={handleSubmit}
                >
                    <Input
                        divClassNames={"form-field-wrapper pass-wrapper"}
                        isAutoFocus={true}
                        value={formData.oldPassword}
                        onChange={handleChange}
                        type="password"
                        nameAndId="oldPassword"
                        labelClassName="placeholder"
                        labelTextValue="Old password"
                        isPassword={true}
                        handleHide={handleHideOldPassword}
                    />
                    <Input
                        divClassNames={"form-field-wrapper pass-wrapper"}
                        isAutoFocus={false}
                        value={formData.newPassword}
                        onChange={handleChange}
                        type="password"
                        nameAndId="newPassword"
                        labelClassName="placeholder"
                        labelTextValue="New password"
                        isPassword={true}
                        handleHide={handleHideNewPassword}
                    />
                    <Input
                        divClassNames={"form-field-wrapper pass-wrapper"}
                        isAutoFocus={false}
                        value={formData.repNewPassword}
                        onChange={handleChange}
                        type="password"
                        nameAndId="repNewPassword"
                        labelClassName="placeholder"
                        labelTextValue="Repeat new password"
                        isPassword={true}
                        handleHide={handleHideRepNewPassword}
                    />
                    <button className="form-button apply" type="submit">Apply</button>
                    <button className="form-button cancel" onClick={props.handleCancel}>Cancel</button>
                </form>
            </div>
        </Fragment>
    )
}

export default EditPassword;