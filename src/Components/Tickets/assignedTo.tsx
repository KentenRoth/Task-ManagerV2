type IProps = {
	assignedTo?: string;
};

const AssignedTo = (props: IProps) => {
	return (
		<div className="ticket_assigned">
			<p>{props.assignedTo}</p>
		</div>
	);
};

export default AssignedTo;
