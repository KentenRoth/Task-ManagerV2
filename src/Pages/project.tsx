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

	//! There has to be better way
	let completed: Tickets[] = [];
	let current: Tickets[] = [];
	let high: Tickets[] = [];
	let medium: Tickets[] = [];
	let low: Tickets[] = [];
	let assigned: Tickets[] = [];
	let unassigned: Tickets[] = [];
	let priority: Tickets[] = [];

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
							<SoloTickets tickets={current} />
						) : (
							<TeamTickets tickets={current} />
						)}
					</div>
					<div className="high-priority-tickets column">
						{soloOrTeam ? (
							<SoloTickets tickets={high} />
						) : (
							<TeamTickets tickets={assigned} />
						)}
					</div>
					<div className="medium-priority-tickets column">
						{soloOrTeam ? (
							<SoloTickets tickets={medium} />
						) : (
							<TeamTickets tickets={unassigned} />
						)}
					</div>
					<div className="low-priority-tickets column">
						{soloOrTeam ? (
							<SoloTickets tickets={low} />
						) : (
							<TeamTickets tickets={priority} />
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default TaskManager;
