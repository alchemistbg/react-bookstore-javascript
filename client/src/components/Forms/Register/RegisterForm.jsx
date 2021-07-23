import React, { Fragment, Component, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Recaptcha from "react-google-recaptcha";

import Input from "../../Common/Input/Input";
import { registerUser } from "../../../requests/userRequests";
import { validateForm, validateInput } from "../../../utils/inputValidation";
import { showToast } from "../../../utils/helpers";

const RegisterForm = (props) => {

	// const [fieldType, setFieldType] = useState("password");
	const [showPassword, setShowPassword] = useState(true);
	const handleHidePassword = () => {
		setShowPassword(!showPassword);
	};

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		repeatPassword: "",
		reCaptchaToken: ""
	});
	const [formErrors, setFormErrors] = useState({
		firstName: [],
		lastName: [],
		email: [],
		userName: [],
		password: [],
		repeatPassword: [],
	});

	const reCaptchaRef = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();
		// const reCaptchaToken = await reCaptchaRef.current.executeAsync();
		// const reCaptchaToken = await reCaptchaRef.current;
		// reCaptchaRef.current.reset();

		setFormData((formData) => ({
			...formData
		}));

		validateForm("register", formData)
			.then(async () => {
				try {
					// const user = await registerUser(formData, reCaptchaToken);
					const user = await registerUser(formData);
					showToast("success", {
						title: `Registration successful.`,
						message: `You will be now redirected to login page.`,
					});
					props.history.push("/login");
				} catch (error) {
					console.log(error);
					// setFormErrors((formErrors) => ({
					// 	...formErrors,
					// 	userName: [],
					// 	email: [],
					// 	password: [],
					// 	repeatPassword: []
					// }));

					// error.response.data.info.map((err) => {
					// 	formErrors[err.param].push(err.msg);
					// 	return undefined;
					// });
					// setFormErrors((formErrors) => ({
					// 	...formErrors,
					// 	userName: [],
					// 	email: [],
					// 	password: [],
					// 	repeatPassword: []
					// }));
					// showToast("error", formErrors);
				}
			})
			.catch((errors) => {
				// console.log(errors);
				// setFormErrors((formErrors) => ({
				// 	...formErrors,
				// 	...errors
				// }));
				// console.log(formErrors);
				// showToast("error", formErrors);
				showToast("error", errors);
			});
	}

	const handleChange = ({ currentTarget: input }) => {
		if (input.value) {
			input.className = "filled-input";
		} else {
			input.className = "";
		}

		// validateInput('register', input.name, input.value)
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		setFormData((formData) => ({
			...formData,
			[input.name]: input.value
		}));
	};

	return (
		(document.title = 'Reactive Bookstore | Register'),
		(
			<Fragment>
				<h2 className="form-header">Register</h2>
				<div id="register-form">
					<form
						className="form register-form"
						onSubmit={handleSubmit}
					>
						<Input
							// isAutoFocus={true}
							isAutoFocus={false}
							divClassNames="form-field-wrapper uname-wrapper"
							value={formData.userName}
							onChange={handleChange}
							type="text"
							nameAndId="userName"
							labelClassName="placeholder"
							labelTextValue="Username"
						/>
						<Input
							isAutoFocus={false}
							divClassNames="form-field-wrapper email-wrapper"
							value={formData.email}
							onChange={handleChange}
							type="text"
							nameAndId="email"
							labelClassName="placeholder"
							labelTextValue="Email"
						/>
						<Input
							isAutoFocus={false}
							divClassNames="form-field-wrapper fname-wrapper"
							value={formData.firstName}
							onChange={handleChange}
							type="text"
							nameAndId="firstName"
							labelClassName="placeholder"
							labelTextValue="First Name"
						/>
						<Input
							isAutoFocus={false}
							divClassNames="form-field-wrapper lname-wrapper"
							value={formData.lastName}
							onChange={handleChange}
							type="text"
							nameAndId="lastName"
							labelClassName="placeholder"
							labelTextValue="Last Name"
						/>
						<Input
							isAutoFocus={false}
							divClassNames="form-field-wrapper pass-wrapper"
							value={formData.password}
							onChange={handleChange}
							type="password"
							nameAndId="password"
							labelClassName="placeholder"
							labelTextValue="Password"
							isPassword={true}
							handleHidePassword={handleHidePassword}
							showPassword={showPassword}
						/>
						<Input
							isAutoFocus={false}
							divClassNames="form-field-wrapper pass-rep-wrapper"
							value={formData.repeatPassword}
							onChange={handleChange}
							type="password"
							nameAndId="repeatPassword"
							labelClassName="placeholder"
							labelTextValue="Repeat password"
							isPassword={true}
							handleHidePassword={handleHidePassword}
							showPassword={showPassword}
						/>
						<button className="form-button" type="submit">
							Register
						</button>
					</form>
					{/* <Recaptcha
						sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
						// size='invisible'
						size='compact'
						ref={reCaptchaRef}
					/> */}
				</div>
				<div className="form-footer">
					Already have an account? Please go to{" "}
					{
						<Link to="/login">
							<b className="redirects">Login</b>
						</Link>
					}{" "}
					page
				</div>
			</Fragment>
		)
	);
}

export default RegisterForm;
