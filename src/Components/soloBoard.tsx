import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Columns from './columns';
import axiosProject from '../axios/axiosProject';
import { DragDropContext } from 'react-beautiful-dnd';

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
			{ title: 'CurrentFocus', tickets: currentFocus },
			{ title: 'Tasks', tickets: tasks },
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

	let handleOnDragEnd = (update: any) => {
		const { destination, source } = update;
		if (!update.destination) return;

		const sourceColumnIndex = columns.findIndex(
			(column) => column.title === source.droppableId
		);
		const destinationColumnIndex = columns.findIndex(
			(column) => column.title === destination.droppableId
		);

		const sourceTickets = Array.from(columns[sourceColumnIndex].tickets);
		const destinationTickets = Array.from(
			columns[destinationColumnIndex].tickets
		);

		const [draggedTicket] = sourceTickets.splice(source.index, 1);
		destinationTickets.splice(destination.index, 0, draggedTicket);

		const updatedColumns = [...columns];
		updatedColumns[sourceColumnIndex].tickets = sourceTickets;
		updatedColumns[destinationColumnIndex].tickets = destinationTickets;
		setColumns(updatedColumns);
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
								afterDrop={afterDrop}
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
