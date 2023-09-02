import { AppDispatch, RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Columns from './columns';
import axiosProject from '../axios/axiosProject';
import axiosUser from '../axios/axiosUser';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateProjectTickets } from '../features/ticketSlice';

import { AllColumns, Tickets } from '../types';

interface IProps {
	id: string;
}

const TeamBoard = (props: IProps) => {
	const allTickets = useSelector((state: RootState) => state.tickets);
	const allColumns = useSelector(
		(state: RootState) => state.projects.currentProject.columns
	);
	const [columns, setColumns] = useState<AllColumns[]>([]);
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [columnsUpdate, setColumnsUpdate] = useState<boolean>(false);
	const [initialSort, setInitialSort] = useState<boolean>(true);

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

	useEffect(() => {
		if (!columnsUpdate) return;
		sendingColumnOrder();
	}, [columnsUpdate]);

	let sortTickets = (array: Tickets[]) => {
		if (array.length === 0) {
			return;
		}

		const completed: Tickets[] = array.filter((ticket) => ticket.completed);
		const assigned: Tickets[] = array.filter(
			(ticket) =>
				ticket.assigned && !ticket.currentFocus && !ticket.completed
		);
		const unassigned: Tickets[] = array.filter(
			(ticket) =>
				!ticket.assigned && !ticket.completed && !ticket.currentFocus
		);
		const currentFocus: Tickets[] = array.filter(
			(ticket) => ticket.currentFocus && !ticket.completed
		);

		completed.sort((a, b) => a.order - b.order);
		currentFocus.sort((a, b) => a.order - b.order);
		assigned.sort((a, b) => a.order - b.order);
		unassigned.sort((a, b) => a.order - b.order);

		if (initialSort) {
			if (!allColumns || allColumns.length < 1) {
				setColumns([
					{ title: 'Current Focus', tickets: currentFocus, order: 0 },
					{ title: 'Assigned', tickets: assigned, order: 1 },
					{ title: 'Unassigned', tickets: unassigned, order: 2 },
					{ title: 'Completed', tickets: completed, order: 3 },
				]);
				return setInitialSort(false);
			} else {
				let columnArray: AllColumns[] = [];
				allColumns.map((column) => {
					if (column.title === 'Current Focus') {
						columnArray.push({
							title: column.title,
							order: column.order,
							tickets: currentFocus,
						});
					}
					if (column.title === 'Assigned') {
						columnArray.push({
							title: column.title,
							order: column.order,
							tickets: assigned,
						});
					}
					if (column.title === 'Unassigned') {
						columnArray.push({
							title: column.title,
							order: column.order,
							tickets: unassigned,
						});
					}
					if (column.title === 'Completed') {
						columnArray.push({
							title: column.title,
							order: column.order,
							tickets: completed,
						});
					}
				});
				setColumns(columnArray);
				return setInitialSort(false);
			}
		}

		let columnArray: AllColumns[] = [];
		columns.map((column) => {
			if (column.title === 'Current Focus') {
				columnArray.push({
					title: column.title,
					order: column.order,
					tickets: currentFocus,
				});
			}
			if (column.title === 'Assigned') {
				columnArray.push({
					title: column.title,
					order: column.order,
					tickets: assigned,
				});
			}
			if (column.title === 'Unassigned') {
				columnArray.push({
					title: column.title,
					order: column.order,
					tickets: unassigned,
				});
			}
			if (column.title === 'Completed') {
				columnArray.push({
					title: column.title,
					order: column.order,
					tickets: completed,
				});
			}
		});
		setColumns(columnArray);
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
		if (update.type === 'Ticket') {
			return ticketDragEnd(update);
		}
		return columnDragEnd(update);
	};

	let ticketDragEnd = (update: any) => {
		const { destination, source } = update;
		if (!update.destination) return;

		console.log(update);

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

		if (destination.droppableId === 'Assigned') {
			return console.log('Assigned Function here');
		}

		return unAssignedUpdate(update.draggableId, destination.index);
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

	let columnDragEnd = (update: any) => {
		if (!update.destination) return;
		let finalOrder: AllColumns[] = [];
		let columnOrder = Array.from(columns);
		const [newOrder] = columnOrder.splice(update.source.index, 1);
		columnOrder.splice(update.destination.index, 0, newOrder);
		columnOrder.map((column, index) => {
			finalOrder.push({ ...column, order: index });
		});
		setColumns(finalOrder);
		setColumnsUpdate(true);
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

	let unAssignedUpdate = (id: string, index: number) => {
		columns.forEach((column) => {
			const ticketIndex = column.tickets.findIndex(
				(ticket) => ticket._id === id
			);
			if (ticketIndex !== -1) {
				const updatedTicket = {
					...column.tickets[ticketIndex],
					completed: false,
					currentFocus: false,
					assigned: false,
					assignedTo: '',
					order: index,
				};
				updateTicketOnServer(updatedTicket, index);
			}
		});
	};

	let updateTicketOnServer = (ticket: Tickets, index: number) => {
		const { _id, completed, currentFocus } = ticket;
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
	let sendingColumnOrder = () => {
		if (columns.length === 0) return;
		let columnsData: any = [];
		columns.map((column) => {
			columnsData.push({ title: column.title, order: column.order });
		});

		axiosUser
			.patch(`/projects/${props.id}`, {
				columns: columnsData,
			})
			.then((response) => {
				if (response.status === 200) {
					setColumnsUpdate(false);
				}
			});
	};

	return (
		<>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable
					droppableId={'boardDrop'}
					type="Column"
					direction="horizontal"
					ignoreContainerClipping={true}
				>
					{(provided) => (
						<div
							className="task-manager_container"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{columns.map((column, index) => {
								return (
									<Columns
										title={column.title}
										tickets={column.tickets}
										index={index}
										key={index}
									/>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default TeamBoard;
