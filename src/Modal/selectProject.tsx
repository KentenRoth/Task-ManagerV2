import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { currentProject } from '../features/projectSlice';
import { addProjectTickets } from '../features/ticketSlice';
import axiosProject from '../axios/axiosProject';

import { Projects } from '../types';

interface IProps {
	projects: Projects[];
	show(): void;
}

const SelectProject = (props: IProps) => {
	const [disableButton, setDisableButton] = useState(true);
	const [project, setProject] = useState({} as Projects);

	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: { target: HTMLSelectElement }) => {
		const selected = e.target.options[e.target.selectedIndex];
		const i = selected.dataset.index || 0;
		if (e.target.value === 'default') return setDisableButton(true);
		setDisableButton(false);
		setProject(props.projects[Number(i)]);
		localStorage.setItem(
			'projectID',
			props.projects[Number(i)].tokens[0].token
		);
	};

	const handleSubmit = () => {
		const { _id, created, owner, title, teams, admins, tokens, columns } =
			project;
		dispatch(
			currentProject({
				_id,
				created,
				owner,
				title,
				teams,
				admins,
				tokens,
				columns,
			})
		);
		axiosProject.get('/tickets').then((res) => {
			if (res.status === 200) {
				dispatch(addProjectTickets(res.data));
			}
		});
		props.show();
	};

	return (
		<div className={'modal'}>
			<div className="modal-box">
				<form>
					<select onChange={handleChange}>
						<option value="default">Select A Project</option>
						{props.projects.map((x, i) => {
							return (
								<option
									key={x._id}
									data-index={i}
									value={x._id}
								>
									{x.title}
								</option>
							);
						})}
					</select>
					<button
						className="purple-button"
						type="button"
						onClick={handleSubmit}
						disabled={disableButton}
					>
						Select Project
					</button>
					<div onClick={props.show} className="close">
						X
					</div>
				</form>
			</div>
		</div>
	);
};

export default SelectProject;
