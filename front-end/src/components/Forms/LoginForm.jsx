import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Input from './Input';
import { loginUser } from '../../services/requests';
import { validateForm, validateInput } from '../../utils/inputValidation';
import { showToast } from '../../utils/helpers';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Login',
            editing: undefined,
            loginInfo: {
                username: '',
                password: ''
            },
            loginErrors: {

            },
            inputError: {
                username: false,
                password: false,
            }
        }
    }

    handleChange = ({ currentTarget: input }) => {
        if (input.value) {
            input.className = "filled-input";
        }
        else {
            input.className = "";
        }
        const { loginInfo } = { ...this.state }
        loginInfo[input.name] = input.value;
        this.setState({
            loginInfo
        });
    }

    handleSubmit = (event) => {
        const { loginInfo } = this.state;
        event.preventDefault();
        validateForm('login', loginInfo)
            .then(() => {
                loginUser(this.state.loginInfo)
                    .then((response) => {
                        console.log(response)
                        showToast('success', {
                            title: `Welcome, ${response.data.username}.`,
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

                this.setState({
                    loginErrors: errors
                });
                showToast('error', this.state.loginErrors)
            });
    }

    handleFocus = () => {
        // console.log('FOCUS');
        // this.setState({
        //     editing: true
        // });
    }

    handleBlur = ({ currentTarget: input }) => {
        validateInput('login', input.name, this.state.loginInfo)
            .then((errors) => {
                console.log(errors);
                this.setState({
                    inputError: {
                        username: (!!errors.username),
                        password: (!!errors.password)
                    }
                    // usernameError: !(!!errors.username),
                    // passwordError: !(!!errors.password)
                });
            })
            .catch(errors => {
                console.log(errors)
                if (errors.username) {
                    this.setState({
                        inputError: {
                            username: (!!errors.username)
                        }
                    });
                }
                if (errors.password) {
                    this.setState({
                        inputError: {
                            password: (!!errors.password)
                        }
                    });
                }
            });
    }

    render() {
        const { pageName, loginInfo } = this.state;
        const { username, password } = this.state.inputError;
        // console.log(username, password);
        return (
            document.title = pageName,
            < Fragment >
                <h2 className="form-header">Login</h2>
                <div id="login-form">
                    <form className="form login-form" onSubmit={this.handleSubmit}>
                        <Input
                            divClassNames={
                                username ? (
                                    "form-field-wrapper uname-wrapper danger"
                                ) : (
                                        "form-field-wrapper uname-wrapper"
                                    )
                            }
                            isAutoFocus={false}
                            value={loginInfo.username}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            type="text"
                            nameAndId="username"
                            labelClassName="placeholder"
                            labelTextValue="Username"
                            error="no errors" />
                        <Input
                            divClassNames={
                                password ? (
                                    "form-field-wrapper pass-rep-wrapper danger"
                                ) : (
                                        "form-field-wrapper pass-rep-wrapper"
                                    )
                            }
                            isAutoFocus={false}
                            value={loginInfo.password}
                            onChange={this.handleChange}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            type="password"
                            nameAndId="password"
                            labelClassName="placeholder"
                            labelTextValue="Password"
                            error="no errors" />
                        {
                            !!(username || password) ? (
                                <button className="form-button" disabled={true} type="submit">Login</button>
                            ) : (
                                    < button className="form-button" type="submit">Login</button>
                                )
                        }
                    </form>
                </div>
                <div>Don't have an account? Please go to {<Link to="/register">Register</Link>} page.</div>
            </Fragment >
        );
    }
}

export default LoginForm;