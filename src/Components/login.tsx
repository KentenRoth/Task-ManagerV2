import React, { useState } from 'react';

const Login = () => {
	interface User {
		userName?: String;
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
		if (!login.userName || !login.password) {
			setError({
				user: !login.userName,
				pass: !login.password,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		// This will send the data via Axios to the server
	};

	return (
		<>
			<div className="login">
				<h1>Lets Login!</h1>
				<form className="login_form" onSubmit={handleSubmit}>
					{error.user && error.submitHandled && (
						<p>Username is required</p>
					)}
					<input
						type="text"
						placeholder="User Name"
						onChange={(e) =>
							setLogin({
								...login,
								userName: e.target.value,
							})
						}
					/>
					{error.pass && error.submitHandled && (
						<p>Username is required</p>
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
					<button type="submit">Login</button>
				</form>
			</div>
		</>
	);
};

export default Login;
