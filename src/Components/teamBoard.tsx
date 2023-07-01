import TeamTickets from '../Pages/teamTickets';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Columns from './columns';

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

interface AllColumns {
	title: string;
	tickets: Tickets[];
}

const TeamBoard = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [tickets, setTickets] = useState<Tickets[]>([]);
	const [columns, setColumns] = useState<AllColumns[]>([]);

	useEffect(() => {
		sortTickets(allTickets.tickets);
	}, [allTickets]);

	let sortTickets = (array: Tickets[]) => {
		let completed: Tickets[] = [];
		let currentFocus: Tickets[] = [];
		let assigned: Tickets[] = [];
		let unassigned: Tickets[] = [];

		array.forEach((ticket) => {
			if (ticket.completed) {
				return completed.push(ticket);
			}
			if (ticket.currentFocus) {
				return currentFocus.push(ticket);
			}
			if (ticket.assigned) {
				return assigned.push(ticket);
			}
			return unassigned.push(ticket);
		});

		setColumns([
			{ title: 'CurrentFocus', tickets: currentFocus },
			{ title: 'Assigned', tickets: assigned },
			{ title: 'Unassigned', tickets: unassigned },
			{ title: 'Completed', tickets: completed },
		]);
	};

	return (
		<>
			{columns.map((column) => {
				return (
					<div className="columns_container">
						<Columns
							title={column.title}
							tickets={column.tickets}
						/>
					</div>
				);
			})}
		</>
	);
};

export default TeamBoard;
