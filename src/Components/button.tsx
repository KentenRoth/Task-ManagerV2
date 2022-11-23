import React, { FC } from 'react';

interface props {
	styles: String;
	text: String;
	clicked(): void;
}

const Button: FC<props> = (props) => {
	return (
		<button onSubmit={props.clicked} className={`button ${props.styles}`}>
			{props.text}
		</button>
	);
};

export default Button;
