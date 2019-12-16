import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import Input from './Input';
import { registerUser } from '../../utils/requests';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Register',
            registerInfo: {
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                password: '',
                repeatPassword: ''
            },
            registerErrors: {
                username: [],
                email: [],
                password: [],
                repeatPassword: []
            }
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await registerUser(this.state.registerInfo);
        } catch (error) {
            this.setState({
                registerErrors: {
                    username: [],
                    email: [],
                    password: [],
                    repeatPassword: []
                }
            });
            const registerErrors = { ...this.state.registerErrors };
            error.response.data.info.map((err) => {
                registerErrors[err.param].push(err.msg);
                return undefined;
            });
            this.setState({
                registerErrors
            });
        }
    }

    handleChange = ({ currentTarget: input }) => {
        if (input.value) {
            input.className = "filled-input";
        }
        else {
            input.className = "";
        }
        const { registerInfo } = { ...this.state }
        registerInfo[input.name] = input.value;
        this.setState({
            registerInfo
        });
    }

    render() {
        const { pageName, registerInfo } = this.state;
        return (
            document.title = pageName,
            <Fragment>
                <h2 className="form-header">Register</h2>
                <div id="register-form">
                    <form className="form register-form" onSubmit={this.handleSubmit}>
                        <Input
                            isAutoFocus={true}
                            divClassNames="form-field-wrapper uname-wrapper"
                            value={registerInfo.username}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="username"
                            labelClassName="placeholder"
                            labelTextValue="Username" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper email-wrapper"
                            value={registerInfo.email}
                            onChange={this.handleChange}
                            type="email"
                            nameAndId="email"
                            labelClassName="placeholder"
                            labelTextValue="Email" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper fname-wrapper"
                            value={registerInfo.firstname}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="firstname"
                            labelClassName="placeholder"
                            labelTextValue="First Name" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper lname-wrapper"
                            value={registerInfo.lastname}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="lastname"
                            labelClassName="placeholder"
                            labelTextValue="Last Name" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper pass-wrapper"
                            value={registerInfo.password}
                            onChange={this.handleChange}
                            type="password"
                            nameAndId="password"
                            labelClassName="placeholder"
                            labelTextValue="Password" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper pass-rep-wrapper"
                            value={registerInfo.repeatPassword}
                            onChange={this.handleChange}
                            type="password"
                            nameAndId="repeatPassword"
                            labelClassName="placeholder"
                            labelTextValue="Repeat password" />
                        <button className="form-button" type="submit">Register</button>
                    </form>
                </div>
                <div>Already have an account? Please go to {<Link to="/login">Login</Link>} page</div>
            </Fragment>
        );
    }
}

export default RegisterForm;