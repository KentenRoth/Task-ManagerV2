import React, { useState } from 'react';

interface Form {
	summary: string;
	description: string;
	priority: string;
}

interface Error {
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
		summary: '',
		description: '',
		priority: '',
	});
	const [error, setError] = useState<Error>({} as Error);

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
		// This will send the data
		// TODO The ticket slice still needs created
		console.log('running');
	};

	return (
		<>
			<div className={'modal'}>
				<div className="modal-box">
					<form id="create_ticket" onSubmit={handleSubmit}>
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
