import React, { useState } from 'react';
import axiosUser from '../axios/axiosUser';
import { AppDispatch } from '../app/store';
import { addNewProject } from '../features/projectSlice';
import { useDispatch } from 'react-redux';

interface Form {
	title: String;
}

interface Error {
	title: boolean;
	submitHandled: boolean;
}

interface IProps {
	show(): void;
}

const CreateProject = (props: IProps) => {
	const [create, setCreate] = useState<Form>({} as Form);
	const [error, setError] = useState<Error>({} as Error);

	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ ...error, submitHandled: false });
		e.preventDefault();
		if (!Object.values(create).some((v) => v)) {
			setError({
				...error,
				title: !create.title,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		let { title } = create;
		axiosUser
			.post('projects', {
				title,
			})
			.then((res) => {
				if (res.status === 201) {
					dispatch(addNewProject(res.data.project));
					return props.show();
				}
				console.log('There was an issue creating the project');
			});
	};

	return (
		<>
			<div className="modal">
				<div>
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

export default CreateProject;
