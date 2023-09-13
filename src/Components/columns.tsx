import React from 'react';
import Ticket from '../Components/Tickets/ticket';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Tickets } from '../types';

interface IProps {
	title: string;
	tickets: Tickets[];
	index: number;
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
						className="column_container"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="task_wrapper">
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
