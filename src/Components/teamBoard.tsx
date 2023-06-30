import TeamTickets from '../Pages/teamTickets';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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

const TeamBoard = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [tickets, setTickets] = useState<Tickets[]>([]);
	const [completed, setCompleted] = useState<Tickets[]>([]);

	useEffect(() => {
		sortTickets(allTickets.tickets);
	}, [allTickets]);

	const sortTickets = (array: Tickets[]) => {
		console.log(allTickets);
		const ticketGroups: {
			[key: string]: Tickets[];
		} = {
			currentFocus: [],
			unassigned: [],
			assigned: [],
			completed: [],
		};

		array.forEach((ticket) => {
			if (ticket.completed) {
				return ticketGroups.completed.push(ticket);
			}
			if (ticket.currentFocus) {
				return ticketGroups.currentFocus.push(ticket);
			}
			if (ticket.assigned) {
				return ticketGroups.assigned.push(ticket);
			}
			return ticketGroups.unassigned.push(ticket);
		});

		setTickets([
			...ticketGroups.currentFocus,
			...ticketGroups.unassigned,
			...ticketGroups.assigned,
		]);
		setCompleted(ticketGroups.completed);
	};

	return (
		<>
			<div className="team-current-focus">
				<TeamTickets
					tickets={tickets.filter((ticket) => ticket.currentFocus)}
				/>
			</div>
			<div className="team-unassigned">
				<TeamTickets
					tickets={tickets.filter(
						(ticket) => !ticket.currentFocus && !ticket.assigned
					)}
				/>
			</div>
			<div className="team-assigned">
				<TeamTickets
					tickets={tickets.filter((ticket) => ticket.assigned)}
				/>
			</div>
			<div className="team-assigned">
				<TeamTickets tickets={completed} />
			</div>
		</>
	);
};

export default TeamBoard;
