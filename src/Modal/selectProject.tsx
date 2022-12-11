import React, { useDebugValue, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { currentProject } from '../features/projectSlice';

interface IProps {
	projects: {
		admin?: string[];
		team?: string[];
		title: string;
		created: number;
		_id: string;
	}[];

	show: boolean;
}

const SelectProject = (props: IProps) => {
	const [showHide, setShowHide] = useState('selectProject');
	const [disableButton, setDisableButton] = useState(true);
	const [project, setProject] = useState('');

	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: { target: HTMLSelectElement }) => {
		if (e.target.value === 'default') return setDisableButton(true);
		setDisableButton(false);
		setProject(e.target.value);
	};

	const handleSubmit = () => {
		dispatch(currentProject(project));
	};

	return (
		<div className={'selectProject'}>
			<form>
				<select onChange={handleChange}>
					<option value="default">Select A Project</option>
					{props.projects.map((x) => {
						return (
							<option key={x._id} value={x._id}>
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
			</form>
		</div>
	);
};

export default SelectProject;
