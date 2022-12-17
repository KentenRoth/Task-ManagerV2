import React, { useState } from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

// Components
import SelectProject from '../Modal/selectProject';
import CreateProject from '../Modal/createProject';
import CreateTicket from '../Modal/createTicket';
import AddTeam from '../Modal/addTeam';

const Sidebar = () => {
	// Function call to close the modal
	const [showSelect, setShowSelect] = useState(Boolean);
	const [showCreateProject, setShowCreateProject] = useState(Boolean);
	const [showCreateTicket, setShowCreateTicket] = useState(Boolean);
	const [showAddTeam, setShowAddTeam] = useState(Boolean);

	const allProjects = useSelector((state: RootState) => state.projects);

	const showHideSelectProject = () => {
		setShowSelect((current) => !current);
	};

	const showHideCreateProject = () => {
		setShowCreateProject((current) => !current);
	};

	const showHideCreateTicket = () => {
		setShowCreateTicket((current) => !current);
	};

	const showHideAddTeam = () => {
		setShowAddTeam((current) => !current);
	};

	return (
		<>
			<div className={'sidebar'}>
				<button onClick={showHideSelectProject}>Select Project</button>
				<button onClick={showHideCreateProject}>Create Project</button>
				<button onClick={showHideCreateTicket}>Create Ticket</button>
				<button onClick={showHideAddTeam}>Add Team Member</button>
			</div>
			{showSelect === true && (
				<SelectProject
					projects={allProjects.projects}
					show={showHideSelectProject}
				/>
			)}
			{showCreateProject === true && (
				<CreateProject show={showHideCreateProject} />
			)}
			{showCreateTicket === true && (
				<CreateTicket show={showHideCreateTicket} />
			)}
			{showAddTeam === true && <AddTeam show={showHideAddTeam} />}
		</>
	);
};

export default Sidebar;
