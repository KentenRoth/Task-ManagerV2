import Ticket from '../Components/Tickets/ticket';

import { Tickets } from '../types';

// TODO sort by Current Focus (toggles to completed), High, Medium, Low,

interface IProps {
	tickets: Tickets[];
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
