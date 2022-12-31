import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Ticket from '../Components/ticket';

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
		created: number;
		completed: boolean;
		assigned: boolean;
		currentFocus: boolean;
	}[];
}

const SoloTickets = (props: IProps) => {
	return (
		<>
			{props.tickets.map((ticket) => {
				return <Ticket ticket={ticket} />;
			})}
		</>
	);
};

export default SoloTickets;
