import React, { useState } from 'react';
import axiosConfig from '../axios/axiosconfig';

// TODO
// After successful login advance to main page

const Login = () => {
	interface User {
		username?: String;
		password?: String;
	}

	interface Error {
		user?: boolean;
		pass?: boolean;
		submitHandled: boolean;
	}

	const [login, setLogin] = useState<User>({} as User);
	const [error, setError] = useState<Error>({} as Error);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ submitHandled: false });
		e.preventDefault();
		if (!login.username || !login.password) {
			setError({
				user: !login.username,
				pass: !login.password,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		const { username, password } = login;
		axiosConfig
			.post('/users/login', {
				username,
				password,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					localStorage.setItem('jswToken', res.data.authToken);
				}
			});
	};
	return (
		<>
			<div className="background-container">
				{/* <img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
					alt=""
				/> */}
				<div className="stars"></div>
				<div className="twinkling"></div>
				<div className="login">
					<div className="login_box">
						<h2>Please Login</h2>
						<form className="login_form" onSubmit={handleSubmit}>
							{error.user && error.submitHandled && (
								<p className="inputError">
									Username is required
								</p>
							)}
							<input
								type="text"
								placeholder="User Name"
								onChange={(e) =>
									setLogin({
										...login,
										username: e.target.value,
									})
								}
							/>
							{error.pass && error.submitHandled && (
								<p className="inputError">
									Password is required
								</p>
							)}
							<input
								type="password"
								placeholder="Password"
								onChange={(e) =>
									setLogin({
										...login,
										password: e.target.value,
									})
								}
							/>
							<button className="purple-button" type="submit">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
