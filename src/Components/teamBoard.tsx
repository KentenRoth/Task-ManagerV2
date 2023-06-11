import TeamTickets from '../Pages/teamTickets';

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
let unassigned: Tickets[] = [];
let assigned: Tickets[] = [];

const TeamBoard = (props: IProps) => {
	props.tickets.forEach((ticket) => {
		if (ticket.completed === true) {
			return completed.push(ticket);
		}
		if (ticket.currentFocus === true) {
			return currentTask.push(ticket);
		}
		if (ticket.assigned === true) {
			return assigned.push(ticket);
		}
		return unassigned.push(ticket);
	});

	return (
		<>
			<div className="team-current-focus">
				<TeamTickets tickets={currentTask} />
			</div>
			<div className="team-unassigned">
				<TeamTickets tickets={unassigned} />
			</div>
			<div className="team-assigned">
				<TeamTickets tickets={assigned} />
			</div>
			<div className="team-assigned">
				<TeamTickets tickets={completed} />
			</div>
		</>
	);
};

export default TeamBoard;
