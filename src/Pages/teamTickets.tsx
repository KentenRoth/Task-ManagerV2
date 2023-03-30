import Ticket from '../Components/Tickets/ticket';

// TODO sort by Current Focus (toggles to completed), Assigned, Unassigned, Priority level will sort within column

interface IProps {
	tickets: {
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
	}[];
}

const TeamTickets = (props: IProps) => {
	return (
		<>
			{props.tickets.map((ticket) => {
				return <Ticket key={ticket._id} ticket={ticket} />;
			})}
		</>
	);
};

export default TeamTickets;
