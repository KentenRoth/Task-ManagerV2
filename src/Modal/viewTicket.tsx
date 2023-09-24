import { Tickets } from '../types';

interface IProps {
	ticket: Tickets;
	show(): void;
}

const ViewTicket = (props: IProps) => {
	let { description, title, summary } = props.ticket;
	return (
		<>
			<div className="modal view-ticket-modal">
				<div className="modal-box">
					<div className="modal_content">
						<h3>Title</h3>
						<p>{title}</p>
						<h3>Summary</h3>
						<p>{summary}</p>
						<h3>Description</h3>
						<p> {description} </p>
						<div className="edit-button_wrapper">
							<button className="edit-button">Edit</button>
						</div>
						<div onClick={props.show} className="close">
							X
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewTicket;
