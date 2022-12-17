import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { currentProject } from '../features/projectSlice';

interface IProps {
	projects: {
		admin?: string[];
		team?: string[];
		title: string;
		created: number;
		_id: string;
		tokens: Tokens[];
		owner: string;
	}[];
	show(): void;
}

type Project = {
	admin?: string[];
	team?: string[];
	title: string;
	created: number;
	_id: string;
	tokens: Tokens[];
	owner: string;
};

interface Tokens {
	_id: string;
	token: string;
}

const SelectProject = (props: IProps) => {
	const [disableButton, setDisableButton] = useState(true);
	const [project, setProject] = useState({} as Project);

	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: { target: HTMLSelectElement }) => {
		const selected = e.target.options[e.target.selectedIndex];
		const i = selected.dataset.index || 0;
		if (e.target.value === 'default') return setDisableButton(true);
		setDisableButton(false);
		setProject(props.projects[Number(i)]);
	};

	const handleSubmit = () => {
		const { _id, created, owner, title, team, admin, tokens } = project;
		dispatch(
			currentProject({ _id, created, owner, title, team, admin, tokens })
		);

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
