// TODO will hold ticket details.  Also class will be added for Completed, Priority level, Current Focus
import { useState, MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import axiosProject from '../../axios/axiosProject';
import { updateProjectTickets } from '../../features/ticketSlice';
import AssignedTo from './assignedTo';
import Description from './description';

interface Ticket {
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

type IProps = {
	ticket: Ticket;
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

	const ticketCompletedClicked = (e: MouseEvent<HTMLButtonElement>) => {
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
		console.log('Edit');
		setShowEditDetails((current) => !current);
	};

	const {
		_id,
		summary,
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
		<div className={`ticket ${color}`} id={_id}>
			<div className="ticket_edit">
				<button onClick={showEdit}>Edit</button>
				<button onClick={ticketCompletedClicked}>Completed</button>
			</div>
			<div onClick={showHideTicketDetails}>
				<div className="ticket_top-copy">
					<h2>{title}</h2>
				</div>
				{showTicketDetails === true && (
					<Description description={description} />
				)}
				{assignedTo && <AssignedTo assignedTo={assignedTo} />}
			</div>
		</div>
	);
};

export default SingleTicket;
