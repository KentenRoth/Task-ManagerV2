import React, { useState } from 'react';
import axiosUser from '../axios/axiosUser';
import { Navigate } from 'react-router-dom';

//TODO
// Redirect to main page if signup is completed
// Navigate replaced Redirect in react router dom

const SignUp = () => {
	interface User {
		email: String;
		username: String;
		name: String;
		password1: String;
		password2: String;
	}

	interface Error {
		email: boolean;
		username: boolean;
		name: boolean;
		usernameTaken: boolean;
		password1: boolean;
		password2: boolean;
		passwordMatch: boolean;
		submitHandled: boolean;
	}

	const [signup, setSignup] = useState<User>({
		name: '',
		email: '',
		username: '',
		password1: '',
		password2: '',
	});
	const [error, setError] = useState<Error>({} as Error);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ ...error, submitHandled: false });
		e.preventDefault();
		if (signup.password1 !== signup.password2) {
			setError({
				...error,
				passwordMatch: true,
				submitHandled: true,
			});
			return;
		}

		if (!Object.values(signup).every((v) => v)) {
			setError({
				...error,
				email: !signup.email,
				username: !signup.username,
				name: !signup.name,
				password1: !signup.password1,
				password2: !signup.password2,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		let { name, email, password1, username } = signup;
		axiosUser
			.post('/users', {
				name,
				email,
				username,
				password: password1,
			})
			.then((res) => {
				if (res.status === 201) {
					localStorage.setItem('jswToken', res.data.authToken);
				}
			});
	};

	return (
		<>
			<div className="background-container">
				<div className="signup">
					<div className="signup_box">
						<h2>Sign Up</h2>
						<form
							id="signup_form"
							className="signup_form"
							onSubmit={handleSubmit}
						>
							{error.email && error.submitHandled && (
								<p>Please Check Email Address</p>
							)}
							<input
								type="text"
								placeholder="Email Address"
								onChange={(e) =>
									setSignup({
										...signup,
										email: e.target.value,
									})
								}
							/>
							{error.name && error.submitHandled && (
								<p>Please Check Name</p>
							)}
							<input
								type="text"
								placeholder="Name"
								onChange={(e) =>
									setSignup({
										...signup,
										name: e.target.value,
									})
								}
							/>
							{error.username && error.submitHandled && (
								<p>Please Check Username</p>
							)}
							<input
								type="text"
								placeholder="Username"
								onChange={(e) =>
									setSignup({
										...signup,
										username: e.target.value,
									})
								}
							/>
							{error.password1 && error.submitHandled && (
								<p>Please Check Password</p>
							)}
							<input
								type="password"
								placeholder="Password"
								onChange={(e) =>
									setSignup({
										...signup,
										password1: e.target.value,
									})
								}
							/>
							{error.password2 && error.submitHandled && (
								<p>Please Check Password</p>
							)}
							<input
								type="password"
								placeholder="Type Password Again"
								onChange={(e) =>
									setSignup({
										...signup,
										password2: e.target.value,
									})
								}
							/>
							<button className="purple-button" type="submit">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
