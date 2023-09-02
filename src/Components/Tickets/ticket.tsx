// TODO will hold ticket details.  Also class will be added for Completed, Priority level, Current Focus
import { useState, MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import axiosProject from '../../axios/axiosProject';
import { updateProjectTickets } from '../../features/ticketSlice';
import AssignedTo from './assignedTo';
import Description from './description';
import { Tickets } from '../../types';

import { Draggable } from 'react-beautiful-dnd';

type IProps = {
	ticket: Tickets;
	index: number;
};

const SingleTicket = (props: IProps) => {
	const [showTicketDetails, setShowTicketDetails] = useState(Boolean);
	const [showEditDetails, setShowEditDetails] = useState(Boolean);
	const [isTicketCompleted, setIsTicketCompleted] = useState(
		props.ticket.completed
	);

	const dispatch = useDispatch<AppDispatch>();

	const showHideTicketDetails = () => {
		setShowTicketDetails((current) => !current);
	};

	useEffect(() => {
		setIsTicketCompleted(props.ticket.completed);
	}, [props.ticket.completed]);

	const ticketCompletedClicked = (e: React.ChangeEvent<HTMLElement>) => {
		const parent = e.target as HTMLInputElement;
		setIsTicketCompleted((current) => !current);
		axiosProject
			.patch(`tickets/${parent.parentElement?.offsetParent?.id}`, {
				completed: !isTicketCompleted,
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch(updateProjectTickets(res.data));
				}
			});
	};

	const showEdit = () => {
		setShowEditDetails((current) => !current);
	};

	const {
		_id,
		completed,
		priority,
		title,
		currentFocus,
		assignedTo,
		description,
	} = props.ticket;
	let color: string = priority;

	if (completed === true) {
		color = 'completed';
	}

	if (currentFocus === true) {
		color = 'current';
	}

	return (
		<Draggable
			key={props.ticket._id}
			draggableId={props.ticket._id}
			index={props.index}
		>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className={`ticket ${color}`} id={_id}>
						<div className={'clientRow__client'}>
							<label className={'checkboxContainer'}>
								<input
									type={'checkbox'}
									onChange={ticketCompletedClicked}
									checked={props.ticket.completed}
								/>
								Completed?
								<span className={'checkmark'}></span>
							</label>
						</div>
						<div onClick={showHideTicketDetails}>
							<div className="ticket_top-copy">
								<h2>{title}</h2>
							</div>
							{showTicketDetails === true && (
								<Description description={description} />
							)}
							{assignedTo && (
								<AssignedTo assignedTo={assignedTo} />
							)}
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default SingleTicket;
