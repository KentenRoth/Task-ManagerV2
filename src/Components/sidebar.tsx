import React, { useState } from 'react';
import { AppDispatch, RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';

// Components
import SelectProject from '../Modal/selectProject';
import { currentProject } from '../features/projectSlice';

const Sidebar = () => {
	const dispatch = useDispatch<AppDispatch>();
	// Function call to set set selected Project
	const [selectedProject, setSelectedProject] = useState('');

	// Function call to close the modal
	const [showSelect, setShowSelect] = useState(true);

	const allProjects = useSelector((state: RootState) => state.projects);

	return (
		<>
			<SelectProject projects={allProjects.projects} show={showSelect} />
		</>
	);
};

export default Sidebar;
