import React, { useState } from 'react';
import axiosProject from '../axios/axiosProject';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { createTicket } from '../features/ticketSlice';

interface Form {
	title: string;
	summary: string;
	description: string;
	priority: string;
}

interface Error {
	title: boolean;
	summary: boolean;
	description: boolean;
	priority: boolean;
	submitHandled: boolean;
}

interface IProps {
	show(): void;
}

export const CreateTicket = (props: IProps) => {
	const [create, setCreate] = useState<Form>({
		title: '',
		summary: '',
		description: '',
		priority: '',
	});
	const [error, setError] = useState<Error>({} as Error);

	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ ...error, submitHandled: false });
		e.preventDefault();
		if (create.priority === 'default') {
			setError({
				...error,
				priority: !create.priority,
				submitHandled: true,
			});
			return;
		}
		if (!Object.values(create).every((v) => v)) {
			setError({
				...error,
				summary: !create.summary,
				description: !create.description,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		let { title, summary, description, priority } = create;
		axiosProject
			.post('tickets', {
				title,
				summary,
				description,
				priority,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					dispatch(createTicket(res.data));
					return props.show();
				}
				console.log('There was an error creating the ticket');
			});
	};

	return (
		<>
			<div className={'modal'}>
				<div className="modal-box">
					<form id="create_ticket" onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Title"
							onChange={(e) => {
								setCreate({
									...create,
									title: e.target.value,
								});
							}}
						/>
						<input
							type="text"
							placeholder="Summary"
							onChange={(e) =>
								setCreate({
									...create,
									summary: e.target.value,
								})
							}
						/>
						<select
							onChange={(e) =>
								setCreate({
									...create,
									priority: e.target.value,
								})
							}
						>
							<option value="default">
								Select Priority Level
							</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
						<textarea
							placeholder="Description"
							onChange={(e) =>
								setCreate({
									...create,
									description: e.target.value,
								})
							}
						/>
						<button className="purple-button">Create Ticket</button>
						<div onClick={props.show} className="close">
							X
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateTicket;
