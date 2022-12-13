import React, { useState } from 'react';
import { AppDispatch, RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';

// Components
import SelectProject from '../Modal/selectProject';
import CreateProject from '../Modal/createProject';
import CreateTicket from '../Modal/createTicket';

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();

	// Function call to close the modal
	const [showSelect, setShowSelect] = useState(Boolean);

	const [showCreateProject, setShowCreateProject] = useState(Boolean);

	const allProjects = useSelector((state: RootState) => state.projects);

	const showHideSelectProject = () => {
		setShowSelect((current) => !current);
	};

	const showHideCreateProject = () => {
		setShowCreateProject((current) => !current);
	};

	return (
		<>
			<div className={'sidebar'}>
				<button onClick={showHideSelectProject}>Select Project</button>
				<button onClick={showHideCreateProject}>Create Project</button>
			</div>
			{showSelect === true && (
				<SelectProject
					projects={allProjects.projects}
					show={showHideCreateProject}
				/>
			)}
			{showCreateProject === true && (
				<CreateProject show={showHideCreateProject} />
			)}
			<CreateTicket />
		</>
	);
};

export default Sidebar;
