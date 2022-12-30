import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import SoloTickets from './soloTickets';

// Show all Tasks for current project
// If no current projects Create Project shows on launch

interface Tickets {
	created: number;
	summary: string;
	description: string;
	completed: boolean;
	priority: string;
	assigned?: string;
	status?: string;
	assignedTo?: string;
	owner: string;
	_id: string;
}

const TaskManager = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const hasTeam = useSelector(
		(state: RootState) => state.projects.currentProject
	);

	if (hasTeam.admin?.length !== 0 || hasTeam.team?.length !== 0) {
		console.log('Has Team');
	} else {
		console.log('No team');
	}

	return (
		<>
			<section className="task-manager">
				<div className="container">
					<SoloTickets />
				</div>
			</section>
		</>
	);
};

export default TaskManager;
