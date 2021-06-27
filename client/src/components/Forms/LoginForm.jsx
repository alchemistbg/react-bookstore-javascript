import React, { useState, useContext, Fragment } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import jwt from 'jwt-decode';

import Input from "./Input";
import { loginUser } from "./../../requests/userRequests";
import { validateForm, validateInput } from "./../../utils/inputValidation";
import { showToast } from "./../../utils/helpers";

import UserContext from "./../../context/userContext/UserContext";

const LoginForm = (props) => {
	const [formData, setFormData] = useState({
		userName: "",
		password: "",
	});

	const [{ isLoggedIn, error }, dispatch] = useContext(UserContext);

	const handleChange = ({ currentTarget: input }) => {
		if (input.value) {
			input.className = "filled-input";
		} else {
			input.className = "";
		}

		// validateInput("login", input.name, input.value)
		// 	.then()
		// 	.catch((errors) => {
		// 		console.log(errors);
		// 	});

		setFormData((formData) => ({
			...formData,
			[input.name]: input.value,
		}));
	};

	// const handleFocus = () => {
	// 	console.log('FOCUS');
	// 	this.setState({
	// 	    editing: true
	// 	});
	// };

	// const handleBlur = ({ currentTarget: input }) => {
	// 	validateInput('login', input.name, this.state.loginInfo)
	// 	    .then((errors) => {
	// 	        console.log(errors);
	// 	        this.setState({
	// 	            inputError: {
	// 	                userName: (!!errors.),
	// 	                password: (!!errors.password)
	// 	            }
	// 	            // userNameError: !(!!errors.userName),
	// 	            // passwordError: !(!!errors.password)
	// 	        });
	// 	    })
	// 	    .catch(errors => {
	// 	        console.log(errors)
	// 	        if (errors.userName) {
	// 	            this.setState({
	// 	                inputError: {
	// 	                    userName: (!!errors.userName)
	// 	                }
	// 	            });
	// 	        }
	// 	        if (errors.password) {
	// 	            this.setState({
	// 	                inputError: {
	// 	                    password: (!!errors.password)
	// 	                }
	// 	            });
	// 	        }
	// 	    });
	// };

	let prevLocation = useLocation();
	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(formData);

		validateForm("login", formData)
			.then(() => {
				loginUser(formData)
					.then((response) => {
						const decodedToken = jwt(response.data.token);
						dispatch({
							type: "LOGIN",
							payload: {
								userName: decodedToken.userName,
								userId: decodedToken.userId,
							},
						});
						showToast("success", {
							title: `Welcome, ${decodedToken.userName}.`,
							message: `You will be now redirected to home page.`,
						});

						if (prevLocation === '/register') {
							console.log('test');
							props.history.push("/");
						} else {
							props.history.goBack();
						}
					})
					.catch((error) => {
						console.log(error);
						const { message } = error.response.data;
						let info = undefined;
						if (message === 'Incorrect user data!') {
							info = 'USER DATA'
						}
						const serverError = {};
						serverError[info] = ['Wrong username or password! Please try again!'];
						showToast('error', serverError);
					});
			})
			.catch((errors) => {
				// console.log(errors);
				// console.log(errors)
				// this.setState({
				//     loginErrors: errors
				// });
				showToast("error", errors);
			});
	};

	return (
		(document.title = "Reactive Bookstore | Login"),
		(
			<Fragment>
				{isLoggedIn ? (
					<Redirect to="/" />
				) : (
					<Fragment>
						<h2 className="form-header">Login</h2>
						<div id="login-form">
							<form
								className="form login-form"
								onSubmit={handleSubmit}
							>
								<Input
									divClassNames={
										"form-field-wrapper uname-wrapper"
									}
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
								// error="no errors"
								/>
								<Input
									divClassNames={
										"form-field-wrapper pass-wrapper"
									}
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
								// error="no errors"
								/>
								<button className="form-button" type="submit">
									Login
								</button>
								{/* {
                            !!(formData.userName || formData.password) ? (
                                <button className="form-button" disabled={true} type="submit">Login</button>
                            ) : (
                                    < button className="form-button" type="submit">Login</button>
                                )
                        } */}
							</form>
						</div>
						<div className="form-footer">
							Don't have an account? Please go to{" "}
							{
								<Link to="/register">
									<b className="redirects">Register</b>
								</Link>
							}{" "}
							page.
						</div>
					</Fragment>
				)}
			</Fragment>
		)
	);
};

export default LoginForm;
