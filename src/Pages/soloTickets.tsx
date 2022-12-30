import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// TODO sort by Current Focus (toggles to completed), High, Medium, Low,

const SoloTickets = () => {
	const tickets = useSelector((state: RootState) => state.tickets);

	return (
		<div>
			<div></div>
		</div>
	);
};

export default SoloTickets;
