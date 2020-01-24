import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import Input from './Input';
import { registerUser } from '../../services/requests';
import { validateForm, validateInput } from '../../utils/inputValidation';
import { showToast } from '../../utils/helpers';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Register',
            registerInfo: {
                firstName: '',
                lastName: '',
                email: '',
                userName: '',
                password: '',
                repeatPassword: ''
            },
            registerErrors: {
                userName: [],
                email: [],
                password: [],
                repeatPassword: []
            }
        }
    }

    handleSubmit = async (event) => {
        const { registerInfo } = this.state;
        event.preventDefault();
        validateForm('register', registerInfo)
            .then(async () => {
                try {
                    const user = await registerUser(this.state.registerInfo);
                    showToast('success', {
                        title: `Registration successful.`,
                        message: `You will be now redirected to login page.`
                    });
                    this.props.history.push('/login');
                } catch (error) {
                    this.setState({
                        registerErrors: {
                            userName: [],
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
                    showToast('error', this.state.registerErrors);
                }
            })
            .catch((errors) => {
                this.setState({
                    registerErrors: errors
                });
                showToast('error', this.state.registerErrors);
            });

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
                            // isAutoFocus={true}
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper uname-wrapper"
                            value={registerInfo.userName}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="userName"
                            labelClassName="placeholder"
                            labelTextValue="Username" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper email-wrapper"
                            value={registerInfo.email}
                            onChange={this.handleChange}
                            type="test"
                            nameAndId="email"
                            labelClassName="placeholder"
                            labelTextValue="Email" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper fname-wrapper"
                            value={registerInfo.firstName}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="firstName"
                            labelClassName="placeholder"
                            labelTextValue="First Name" />
                        <Input
                            isAutoFocus={false}
                            divClassNames="form-field-wrapper lname-wrapper"
                            value={registerInfo.lastName}
                            onChange={this.handleChange}
                            type="text"
                            nameAndId="lastName"
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
                <div>Already have an account? Please go to {<Link to="/login"><b className="redirects">Login</b></Link>} page</div>
            </Fragment>
        );
    }
}

export default RegisterForm;