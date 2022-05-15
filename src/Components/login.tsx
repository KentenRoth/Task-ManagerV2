import React, { useState } from 'react';
import { getEffectiveTypeParameterDeclarations } from 'typescript';

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
			return console.log(error);
		}

		console.log(login);
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
								userName: e.target.value,
								password: login.password,
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
								userName: login.userName,
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
