import React, { FC } from 'react';

interface props {
	title: String;
	details: String;
	level?: String;
	user?: String;
	ID: String;
}

const Card: FC<props> = (props) => {
	return (
		<div className={`card ${props.level}`}>
			<div className="card_content">
				<h2>{props.title}</h2>
				<p>{props.details}</p>
				<p>{props.user}</p>
			</div>
		</div>
	);
};

export default Card;
