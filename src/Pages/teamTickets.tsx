import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// TODO sort by Current Focus (toggles to completed), Assigned, Unassigned, Priority level will sort within column

const TeamTickets = () => {
	const tickets = useSelector((state: RootState) => state.tickets);

	return (
		<div>
			<div></div>
		</div>
	);
};

export default TeamTickets;
