import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Input from './Input';
import { loginUser } from '../../utils/requests';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Login',
            loginInfo: {
                username: '',
                password: ''
            },
            loginErrors: {

            }
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser(this.state.loginInfo);
        } catch (error) {
            console.log(error.response.data.param)
        }
        // console.log(event.target)
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

    render() {
        const { pageName, loginInfo } = this.state;
        return (
            document.title = pageName,
            < Fragment >
                <h2 className="form-header">Login</h2>
                <div id="login-form">
                    <form className="form login-form" onSubmit={this.handleSubmit}>
                        <Input
                            isAutoFocus={true}
                            divClassNames="form-field-wrapper uname-wrapper"
                            value={loginInfo.username}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="username"
                            labelClassName="placeholder"
                            labelTextValue="Username" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper pass-rep-wrapper"
                            value={loginInfo.password}
                            onChange={this.handleChange}
                            type="password"
                            nameAndId="password"
                            labelClassName="placeholder"
                            labelTextValue="Password" />
                        <button className="form-button" type="submit">Login</button>
                    </form>
                </div>
                <div>Don't have an account? Please go to {<Link to="/register">Register</Link>} page.</div>
            </Fragment >
        );
    }
}

export default LoginForm;