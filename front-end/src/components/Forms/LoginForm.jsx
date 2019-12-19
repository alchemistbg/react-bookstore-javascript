import React, { useState, useContext, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Input from './Input';
import { loginUser } from '../../services/requests';
import { validateForm, validateInput } from '../../utils/inputValidation';
import { showToast } from '../../utils/helpers';

import AuthContext from './../../context/authContext/AuthContext';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const [{ isLoggedIn, error }, dispatch] = useContext(AuthContext);
    console.log(isLoggedIn);

    const handleChange = ({ currentTarget: input }) => {
        if (input.value) {
            input.className = "filled-input";
        }
        else {
            input.className = "";
        }
        setFormData((formData) => ({
            ...formData,
            [input.name]: input.value
        }));
    }

    const handleFocus = () => {
        // console.log('FOCUS');
        // this.setState({
        //     editing: true
        // });
    }

    const handleBlur = ({ currentTarget: input }) => {
        // validateInput('login', input.name, this.state.loginInfo)
        //     .then((errors) => {
        //         console.log(errors);
        //         this.setState({
        //             inputError: {
        //                 userName: (!!errors.),
        //                 password: (!!errors.password)
        //             }
        //             // userNameError: !(!!errors.userName),
        //             // passwordError: !(!!errors.password)
        //         });
        //     })
        //     .catch(errors => {
        //         console.log(errors)
        //         if (errors.userName) {
        //             this.setState({
        //                 inputError: {
        //                     userName: (!!errors.userName)
        //                 }
        //             });
        //         }
        //         if (errors.password) {
        //             this.setState({
        //                 inputError: {
        //                     password: (!!errors.password)
        //                 }
        //             });
        //         }
        //     });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm('login', formData)
            .then(() => {
                loginUser(formData)
                    .then((response) => {
                        dispatch({
                            type: 'LOGIN',
                            payload: {
                                userName: response.data.userName
                            }
                        });
                        showToast('success', {
                            title: `Welcome, ${response.data.userName}.`,
                            message: `You will be now redirected to home page.`
                        });
                    })
                    .catch((error) => {
                        const { param, message } = error.response.data;
                        const serverError = {};
                        serverError[param] = [message];
                        showToast('error', serverError);
                    });
            })
            .catch((errors) => {
                console.log(errors)
                // this.setState({
                //     loginErrors: errors
                // });
                // showToast('error', this.state.loginErrors)
            });
    }

    return (
        // <div>FUCK</div>
        // document.title = pageName,

        <Fragment>
            {isLoggedIn ? (
                <Redirect to="/" />
            ) : (
                    <Fragment>

                        <h2 className="form-header">Login</h2>
                        <div id="login-form">
                            <form className="form login-form" onSubmit={handleSubmit}>
                                <Input
                                    divClassNames={"form-field-wrapper uname-wrapper"}
                                    // divClassNames={
                                    //     formData.userName ? (
                                    //         "form-field-wrapper uname-wrapper danger"
                                    //     ) : (
                                    //             "form-field-wrapper uname-wrapper"
                                    //         )
                                    // }
                                    isAutoFocus={false}
                                    value={formData.userName}
                                    onChange={handleChange}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    type="text"
                                    nameAndId="userName"
                                    labelClassName="placeholder"
                                    labelTextValue="Username"
                                    error="no errors" />
                                <Input
                                    divClassNames={"form-field-wrapper uname-wrapper"}
                                    // divClassNames={
                                    //     formData.password ? (
                                    //         "form-field-wrapper pass-rep-wrapper danger"
                                    //     ) : (
                                    //             "form-field-wrapper pass-rep-wrapper"
                                    //         )
                                    // }
                                    isAutoFocus={false}
                                    value={formData.password}
                                    onChange={handleChange}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    type="password"
                                    nameAndId="password"
                                    labelClassName="placeholder"
                                    labelTextValue="Password"
                                    error="no errors" />
                                < button className="form-button" type="submit">Login</button>
                                {/* {
                            !!(formData.userName || formData.password) ? (
                                <button className="form-button" disabled={true} type="submit">Login</button>
                            ) : (
                                    < button className="form-button" type="submit">Login</button>
                                )
                        } */}
                            </form>
                        </div>
                        <div>Don't have an account? Please go to {<Link to="/register">Register</Link>} page.</div>
                    </Fragment>
                )}
        </Fragment >
    );
}

export default LoginForm;