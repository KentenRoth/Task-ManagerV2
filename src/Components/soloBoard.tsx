import { AppDispatch, RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosProject from '../axios/axiosProject';
import { DragDropContext } from 'react-beautiful-dnd';

import Columns from './columns';
import { updateProjectTickets } from '../features/ticketSlice';

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

const SoloBoard = () => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const [columns, setColumns] = useState<AllColumns[]>([]);
	const [isLoaded, setLoaded] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();

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
		let tasks: Tickets[] = [];

		array.forEach((ticket) => {
			if (ticket.completed) {
				return completed.push(ticket);
			}
			if (ticket.currentFocus) {
				return currentFocus.push(ticket);
			}
			return tasks.push(ticket);
		});

		completed.sort((a, b) => a.order - b.order);
		currentFocus.sort((a, b) => a.order - b.order);
		tasks.sort((a, b) => a.order - b.order);

		setColumns([
			{ title: 'Current Focus', tickets: currentFocus },
			{ title: 'Tasks', tickets: tasks },
			{ title: 'Completed', tickets: completed },
		]);
	};

	let sameColumnDrop = (update: Tickets[], column: number) => {
		setColumns((prevState) => {
			const updated = [...prevState];
			updated[column] = {
				...updated[column],
				tickets: update,
			};
			return updated;
		});
	};

	let handleOnDragEnd = (update: any) => {
		const { destination, source } = update;
		if (!update.destination) return;

		const sourceColumnIndex = columns.findIndex(
			(column) => column.title === source.droppableId
		);

		if (destination.droppableId === source.droppableId) {
			const tickets = Array.from(columns[sourceColumnIndex].tickets);
			const [newOrder] = tickets.splice(update.source.index, 1);
			tickets.splice(update.destination.index, 0, newOrder);
			return sameColumnDrop(tickets, sourceColumnIndex);
		}

		if (destination.droppableId === 'Completed') {
			return ticketCompletedUpdate(update.draggableId, destination.index);
		}

		if (destination.droppableId === 'Current Focus') {
			return currentFocusUpdate(update.draggableId, destination.index);
		}

		return unCompletedTaskUpdate(update.draggableId, destination.index);
	};

	let unCompletedTaskUpdate = (id: string, index: number) => {
		columns.forEach((column) => {
			const ticketIndex = column.tickets.findIndex(
				(ticket) => ticket._id === id
			);
			if (ticketIndex !== -1) {
				const updatedTicket = {
					...column.tickets[ticketIndex],
					completed: false,
					currentFocus: false,
					order: index,
				};
				updateTicketOnServer(updatedTicket, index);
			}
		});
	};

	let ticketCompletedUpdate = (id: string, index: number) => {
		columns.forEach((column) => {
			const ticketIndex = column.tickets.findIndex(
				(ticket) => ticket._id === id
			);
			if (ticketIndex !== -1) {
				const updatedTicket = {
					...column.tickets[ticketIndex],
					completed: true,
					currentFocus: false,
					order: index,
				};
				updateTicketOnServer(updatedTicket, index);
			}
		});
	};

	let currentFocusUpdate = (id: string, index: number) => {
		columns.forEach((column) => {
			const ticketIndex = column.tickets.findIndex(
				(ticket) => ticket._id === id
			);
			if (ticketIndex !== -1) {
				const updatedTicket = {
					...column.tickets[ticketIndex],
					completed: false,
					currentFocus: true,
					order: index,
				};
				updateTicketOnServer(updatedTicket, index);
			}
		});
	};

	let updateTicketOnServer = (ticket: Tickets, index: number) => {
		const { _id, completed, currentFocus } = ticket;
		console.log(completed, currentFocus, index);
		axiosProject
			.patch(`/tickets/${_id}`, {
				completed,
				currentFocus,
				order: index,
			})
			.then((res) => dispatch(updateProjectTickets(res.data)));
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
			<DragDropContext onDragEnd={handleOnDragEnd}>
				{columns.map((column, index) => {
					return (
						<div className="column" key={index}>
							<Columns
								title={column.title}
								tickets={column.tickets}
								index={index}
							/>
						</div>
					);
				})}
			</DragDropContext>
		</>
	);
};

export default SoloBoard;
