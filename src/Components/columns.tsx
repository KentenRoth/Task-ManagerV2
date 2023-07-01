import React from 'react';
import TeamTickets from '../Pages/teamTickets';
import Ticket from '../Components/Tickets/ticket';

interface IProps {
	title: string;
	tickets: Tickets[];
}

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

const Columns = (props: IProps) => {
	return (
		<>
			<div>
				<h2 style={{ color: 'white' }}>{props.title}</h2>
			</div>
			<div>
				{props.tickets.map((ticket) => {
					return <Ticket key={ticket._id} ticket={ticket} />;
				})}
			</div>
		</>
	);
};

export default Columns;
