import Ticket from '../Components/Tickets/ticket';

// TODO sort by Current Focus (toggles to completed), High, Medium, Low,

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

const SoloTickets = (props: IProps) => {
	return (
		<>
			{props.tickets.map((ticket, index) => {
				return (
					<Ticket key={ticket._id} ticket={ticket} index={index} />
				);
			})}
		</>
	);
};

export default SoloTickets;
