// TODO will hold ticket details.  Also class will be added for Completed, Priority level, Current Focus
import { useState } from 'react';
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

	const showHideTicketDetails = () => {
		setShowTicketDetails((current) => !current);
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
			<div onClick={showEdit} className="ticket_edit">
				<button>Edit</button>
			</div>
			<div onClick={showHideTicketDetails}>
				<div className="ticket_top-copy">
					<h2>{title}</h2>
					<p>{summary}</p>
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
