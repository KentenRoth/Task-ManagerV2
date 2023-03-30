type IProps = {
	description?: string;
};

const Description = (props: IProps) => {
	return (
		<div className="ticket_description">
			<p>{props.description}</p>
		</div>
	);
};

export default Description;
