import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Columns from './columns';
import axiosProject from '../axios/axiosProject';

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
	order: number;
}

interface AllColumns {
	title: string;
	tickets: Tickets[];
}

const TeamBoard = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [columns, setColumns] = useState<AllColumns[]>([]);
	const [isLoaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		sortTickets(allTickets.tickets);
	}, [allTickets]);

	useEffect(() => {
		if (columns.length === 0) {
			return;
		}
		if (!isLoaded) {
			return setLoaded(true);
		}
		sendingNewTicketOrder();
	}, [columns]);

	let sortTickets = (array: Tickets[]) => {
		if (array.length === 0) {
			return;
		}
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

		completed.sort((a, b) => a.order - b.order);
		currentFocus.sort((a, b) => a.order - b.order);
		assigned.sort((a, b) => a.order - b.order);
		unassigned.sort((a, b) => a.order - b.order);

		setColumns([
			{ title: 'CurrentFocus', tickets: currentFocus },
			{ title: 'Assigned', tickets: assigned },
			{ title: 'Unassigned', tickets: unassigned },
			{ title: 'Completed', tickets: completed },
		]);
	};

	let afterDrop = (update: Tickets[], column: number) => {
		setColumns((prevState) => {
			const updated = [...prevState];
			updated[column] = {
				...updated[column],
				tickets: update,
			};
			return updated;
		});
	};

	let sendingNewTicketOrder = () => {
		if (columns.length === 0) {
			return;
		}
		let allTicketIds: string[] = [];
		columns.forEach((column) => {
			column.tickets.forEach((ticket) => {
				allTicketIds.push(ticket._id);
			});
		});

		axiosProject
			.patch('/tickets/reorder', {
				ticketIds: allTicketIds,
			})
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<>
			{columns.map((column, index) => {
				return (
					<div className="columns" key={index}>
						<Columns
							title={column.title}
							tickets={column.tickets}
							afterDrop={afterDrop}
							index={index}
						/>
					</div>
				);
			})}
		</>
	);
};

export default TeamBoard;
