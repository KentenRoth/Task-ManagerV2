import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import SoloTickets from './soloTickets';
import { useState } from 'react';

// Show all Tasks for current project
// If no current projects Create Project shows on launch

interface Tickets {
	_id: string;
	title: string;
	summary: string;
	description: string;
	priority: string;
	status: string;
	owner: string;
	created: number;
	completed: boolean;
	assigned: boolean;
	currentFocus: boolean;
}

const TaskManager = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [currentOrCompleted, setCurrentOrCompleted] = useState(Boolean);
	const hasTeam = useSelector(
		(state: RootState) => state.projects.currentProject
	);

	let completed: Tickets[] = [];
	let current: Tickets[] = [];
	let high: Tickets[] = [];
	let medium: Tickets[] = [];
	let low: Tickets[] = [];

	allTickets.tickets.forEach((ticket) => {
		if (ticket.completed === true) {
			return completed.push(ticket);
		}
		if (ticket.currentFocus === true) {
			return current.push(ticket);
		}
		switch (ticket.priority) {
			case 'high':
				high.push(ticket);
				break;
			case 'medium':
				medium.push(ticket);
				break;
			case 'low':
				low.push(ticket);
				break;
		}
	});

	const showCompleted = () => {
		setCurrentOrCompleted((current) => !current);
	};

	if (hasTeam.admin?.length !== 0 || hasTeam.team?.length !== 0) {
		console.log('Has Team');
	} else {
		console.log('No team');
	}

	return (
		<>
			<section className="task-manager">
				<div className="task-manager_container">
					<div className="current-or-completed column">
						<div>
							<button onClick={showCompleted}>
								Completed Tasks
							</button>
						</div>
						<SoloTickets tickets={current} />
					</div>
					<div className="high-priority-tickets column">
						<SoloTickets tickets={high} />
					</div>
					<div className="medium-priority-tickets column">
						<SoloTickets tickets={medium} />
					</div>
					<div className="low-priority-tickets column">
						<SoloTickets tickets={low} />
					</div>
				</div>
			</section>
		</>
	);
};

export default TaskManager;
