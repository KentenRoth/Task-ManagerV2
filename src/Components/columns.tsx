import React from 'react';
import Ticket from '../Components/Tickets/ticket';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IProps {
	title: string;
	tickets: Tickets[];
	index: number;
	afterDrop(update: Tickets[], column: number): void;
}

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

const Columns = (props: IProps) => {
	let handleOnDragEnd = (update: any) => {
		if (!update.destination) return;

		const tickets = Array.from(props.tickets);
		const [newOrder] = tickets.splice(update.source.index, 1);
		tickets.splice(update.destination.index, 0, newOrder);
		props.afterDrop(tickets, props.index);
	};

	return (
		<>
			<div className="column_container">
				<div className="column_title">
					<h2>{props.title}</h2>
				</div>
				<div>
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="tickets">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{props.tickets.map((ticket, index) => {
										return (
											<Ticket
												key={ticket._id}
												ticket={ticket}
												index={index}
											/>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>
		</>
	);
};

export default Columns;
