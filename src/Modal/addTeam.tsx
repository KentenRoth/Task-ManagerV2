import store from '../app/store';
import axiosUser from '../axios/axiosUser';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addTeamMember } from '../features/projectSlice';

interface Form {
	memberLevel: string;
	username: string;
}

interface Error {
	memberLevel: boolean;
	username: boolean;
	submitHandled: boolean;
}

type Project = {
	admins?: Teammember[];
	teams?: Teammember[];
};

interface Teammember {
	_id: string;
	name: string;
}

interface IProps {
	current: Project;
	show(): void;
}

const AddTeam = (props: IProps) => {
	const [team, setTeam] = useState<Form>({
		memberLevel: '',
		username: '',
	} as Form);
	const [error, setError] = useState<Error>({
		memberLevel: true,
		username: true,
		submitHandled: true,
	} as Error);
	const [disableButton, setDisableButton] = useState(true);

	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: { target: HTMLSelectElement }) => {
		if (e.target.type === 'select-one' && e.target.value === 'default') {
			setError({
				...error,
				memberLevel: true,
			});
			return setDisableButton(true);
		}
		setError({
			...error,
			memberLevel: true,
		});
		setTeam({ ...team, memberLevel: e.target.value });
		return setDisableButton(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setError({ ...error, submitHandled: false });
		e.preventDefault();
		if (!Object.values(team).every((v) => v)) {
			setError({
				...error,
				username: !team.username,
				submitHandled: true,
			});
			return;
		}
		return sendData();
	};

	const sendData = () => {
		let { memberLevel, username } = team;
		let member = memberLevel.slice(0, -1);
		const id = store.getState().projects.currentProject._id;
		axiosUser.get(`/users/${username}`).then((res) => {
			if (res.status !== 200)
				return console.log('could not add teammember');
			axiosUser
				.patch(`/projects/${id}`, {
					[memberLevel]: {
						[member]: {
							name: res.data.username,
							id: res.data._id,
						},
					},
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch(addTeamMember(res.data));
						props.show();
					}
				});
		});
	};

	return (
		<>
			<div className="modal">
				<div className="modal-box">
					<form id="create_project" onSubmit={handleSubmit}>
						<select onChange={handleChange}>
							<option value="default">
								Please Select Member Level
							</option>
							<option value={'admins'}>Admin</option>
							<option value={'teams'}>Team Member</option>
						</select>
						<input
							type="text"
							placeholder="UserName"
							onChange={(e) =>
								setTeam({ ...team, username: e.target.value })
							}
						/>
						<button
							className="purple-button"
							type="submit"
							disabled={disableButton}
						>
							Add Team Memeber
						</button>
						<div onClick={props.show} className="close">
							X
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddTeam;
