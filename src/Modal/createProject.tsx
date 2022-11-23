import axios from 'axios';
import React, { useState } from 'react';
import axiosUser from '../axios/axiosUser';

const CreateTicket = () => {
	interface Form {
		title: String;
	}

	interface Error {
		title: boolean;
		submitHandled: boolean;
	}

	const [create, setCreate] = useState<Form>({} as Form);
	const [error, setError] = useState<Error>({} as Error);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ ...error, submitHandled: false });
		e.preventDefault();
		if (!Object.values(create).some((v) => v)) {
			setError({
				...error,
				title: !create.title,
			});
		}
	};

	const sendData = () => {
		let { title } = create;

		axiosUser
			.post('projects', {
				title,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					// Remove Modal
				}
			});
	};

	return (
		<>
			<div className="create_box">
				<div className="create_form">
					<form id="create_project" onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Project Title"
							onChange={(e) =>
								setCreate({ ...create, title: e.target.value })
							}
						/>
						<button className="purple-button" type="submit">
							Create Project
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateTicket;
