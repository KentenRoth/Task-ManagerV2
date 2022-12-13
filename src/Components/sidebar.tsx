import React, { useState } from 'react';
import { AppDispatch, RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';

// Components
import SelectProject from '../Modal/selectProject';

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();
	// Function call to set set selected Project
	const [selectedProject, setSelectedProject] = useState('');

	// Function call to close the modal
	const [showSelect, setShowSelect] = useState(Boolean);

	const allProjects = useSelector((state: RootState) => state.projects);

	const showHide = () => {
		setShowSelect((current) => !current);
	};

	return (
		<>
			<div className={'sidebar'}>
				<button onClick={showHide}>Select A Project</button>
			</div>
			{showSelect === true && (
				<SelectProject
					projects={allProjects.projects}
					show={showHide}
				/>
			)}
		</>
	);
};

export default Sidebar;
