import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import SoloTickets from './soloTickets';
import TeamTickets from './teamTickets';
import { useState, useEffect } from 'react';

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
	assignedTo: string;
	created: number;
	completed: boolean;
	assigned: boolean;
	currentFocus: boolean;
}

const TaskManager = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [currentOrCompleted, setCurrentOrCompleted] = useState(Boolean);
	const [soloOrTeam, setSoloOrTeam] = useState(Boolean);
	const hasTeam = useSelector(
		(state: RootState) => state.projects.currentProject
	);

	useEffect(() => {
		if (hasTeam.admin?.length !== 0 || hasTeam.team?.length !== 0) {
			setSoloOrTeam(true);
		} else {
			setSoloOrTeam(false);
		}
	}, [hasTeam]);

	let completed: Tickets[] = [];
	let currentTask: Tickets[] = [];
	let high: Tickets[] = [];
	let medium: Tickets[] = [];
	let low: Tickets[] = [];
	let assigned: Tickets[] = [];
	let unassigned: Tickets[] = [];

	allTickets.tickets.forEach((ticket) => {
		if (ticket.completed === true) {
			return completed.push(ticket);
		}
		if (ticket.currentFocus === true) {
			return currentTask.push(ticket);
		}
		if (soloOrTeam === false) {
			switch (ticket.priority) {
				case 'high':
					return high.push(ticket);
					break;
				case 'medium':
					return medium.push(ticket);
					break;
				case 'low':
					return low.push(ticket);
					break;
			}
		}
		if (ticket.assigned === true) {
			return assigned.push(ticket);
		}
		return unassigned.push(ticket);
	});

	const showCompleted = () => {
		setCurrentOrCompleted((current) => !current);
	};

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
						{soloOrTeam ? (
							<TeamTickets tickets={currentTask} />
						) : currentOrCompleted ? (
							<SoloTickets tickets={completed} />
						) : (
							<SoloTickets tickets={currentTask} />
						)}
					</div>
					<div className="high-priority-tickets column">
						{soloOrTeam ? (
							<TeamTickets tickets={assigned} />
						) : (
							<SoloTickets tickets={high} />
						)}
					</div>
					<div className="medium-priority-tickets column">
						{soloOrTeam ? (
							<TeamTickets tickets={unassigned} />
						) : (
							<SoloTickets tickets={medium} />
						)}
					</div>
					<div className="low-priority-tickets column">
						{soloOrTeam ? (
							<TeamTickets tickets={completed} />
						) : (
							<SoloTickets tickets={low} />
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default TaskManager;
