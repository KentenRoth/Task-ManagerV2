// TODO will hold ticket details.  Also class will be added for Completed, Priority level, Current Focus

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
	const {
		_id,
		summary,
		completed,
		priority,
		title,
		currentFocus,
		assignedTo,
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
			<div>
				<h2>{title}</h2>
				<p>{summary}</p>
			</div>
			<div>
				<p>{assignedTo}</p>
			</div>
		</div>
	);
};

export default SingleTicket;
