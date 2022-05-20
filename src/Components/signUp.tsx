import React, { useState } from 'react';

const SignUp = () => {
	interface User {
		email?: String;
		username?: String;
		name?: String;
		password1?: String;
		password2?: String;
	}

	interface Error {
		email?: boolean;
		username?: boolean;
		name?: boolean;
		usernameTaken?: boolean;
		password1?: boolean;
		password2?: boolean;
		passwordMatch?: boolean;
		submitHandled: boolean;
	}

	const [signup, setSignup] = useState<User>({} as User);
	const [error, setError] = useState<Error>({} as Error);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ submitHandled: false });
		e.preventDefault();
		if (signup.password1 !== signup.password2) {
			setError({
				...error,
				passwordMatch: true,
				submitHandled: true,
			});
		}
		if (!Object.values(signup).some((v) => v)) {
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
		// This will send the dta via Axios to the server
	};
	return (
		<>
			<div className="signup">
				<h1>Sign Up</h1>
				<form className="signup_form" onSubmit={handleSubmit}>
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
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
