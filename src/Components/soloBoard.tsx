import SoloTickets from '../Pages/soloTickets';

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

type IProps = {
	tickets: Tickets[];
};

let completed: Tickets[] = [];
let currentTask: Tickets[] = [];
let unCompleted: Tickets[] = [];

const SoloBoard = (props: IProps) => {
	props.tickets.forEach((ticket) => {
		if (ticket.completed === true) {
			return completed.push(ticket);
		}
		if (ticket.currentFocus === true) {
			return currentTask.push(ticket);
		}
		return unCompleted.push(ticket);
	});

	return (
		<>
			<div>
				<SoloTickets tickets={currentTask} />
			</div>
			<div>
				<SoloTickets tickets={unCompleted} />
			</div>
			<div>
				<SoloTickets tickets={completed} />
			</div>
		</>
	);
};

export default SoloBoard;
