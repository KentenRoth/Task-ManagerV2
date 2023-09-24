import Ticket from '../Components/Tickets/ticket';

import { Tickets } from '../types';

interface IProps {
	tickets: Tickets[];
	details(id: string): void;
}

const SoloTickets = (props: IProps) => {
	return (
		<>
			{props.tickets.map((ticket, index) => {
				return (
					<Ticket
						key={ticket._id}
						ticket={ticket}
						index={index}
						details={props.details}
					/>
				);
			})}
		</>
	);
};

export default SoloTickets;
