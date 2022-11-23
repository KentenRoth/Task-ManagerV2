import React, { useState } from 'react';
import axiosUser from '../axios/axiosUser';

const CreateTicket = () => {
	interface Form {
		title: String;
		admin?: [Admin];
		team?: [Team];
	}

	interface Admin {
		username: String;
	}

	interface Team {
		username: String;
	}

	const [create, setCreate] = useState<Form>({} as Form);

	return (
		<>
			<div className="create_box">
				<div className="create_form">
					<form></form>
				</div>
			</div>
		</>
	);
};

export default CreateTicket;
