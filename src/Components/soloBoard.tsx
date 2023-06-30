import SoloTickets from '../Pages/soloTickets';
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

const SoloBoard = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [tickets, setTickets] = useState<Tickets[]>([]);
	const [completed, setCompleted] = useState<Tickets[]>([]);
	const [unCompleted, setUncompleted] = useState<Tickets[]>([]);

	useEffect(() => {
		sortTickets(allTickets.tickets);
	}, [allTickets]);

	let sortTickets = (array: Tickets[]) => {
		const ticketGroups: {
			[key: string]: Tickets[];
		} = {
			completed: [],
			currentFocus: [],
			unCompleted: [],
		};

		array.forEach((ticket) => {
			if (ticket.completed) {
				return ticketGroups.completed.push(ticket);
			}
			if (ticket.currentFocus) {
				return ticketGroups.currentFocus.push(ticket);
			}

			return ticketGroups.unCompleted.push(ticket);
		});

		setCompleted(ticketGroups.completed);
		setUncompleted(ticketGroups.unCompleted);
		setTickets([...ticketGroups.currentFocus]);
	};

	return (
		<>
			<div className="solo">
				<SoloTickets
					tickets={tickets.filter((ticket) => ticket.currentFocus)}
				/>
			</div>
			<div>
				<SoloTickets tickets={unCompleted} />
			</div>
			<div>
				<SoloTickets tickets={completed} />
			</div>
		</>
	);
};

export default SoloBoard;
