import React from 'react';
import Ticket from '../Components/Tickets/ticket';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IProps {
	title: string;
	tickets: Tickets[];
	index: number;
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
	return (
		<>
			<Draggable
				key={props.title}
				draggableId={props.title}
				index={props.index}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="column_container">
							<div className="column_title">
								<h2>{props.title}</h2>
							</div>
							<div>
								<Droppable
									droppableId={props.title}
									type="Ticket"
								>
									{(provided) => (
										<div
											className="droppable-area"
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{props.tickets.map(
												(ticket, index) => {
													return (
														<Ticket
															key={ticket._id}
															ticket={ticket}
															index={index}
														/>
													);
												}
											)}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
						</div>
					</div>
				)}
			</Draggable>
		</>
	);
};

export default Columns;
