import React, { useState } from 'react';
import axiosUser from '../axios/axiosUser';

// Show all Tasks for current project

interface IState {
	loggedIn: boolean;
	projects: Array<Projects>;
}

interface Projects {
	admin?: string[];
	team?: string[];
	title: string;
	created: number;
	_id: string;
}

class TaskManager extends React.Component<{}, IState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			loggedIn: true,
			projects: [],
		};
	}

	componentDidMount(): void {
		axiosUser
			.get('/projects')
			.then((res) => console.log(res.data[0].tokens[0].token));
	}

	render(): React.ReactNode {
		return (
			<>
				<div className="taskManager"></div>
			</>
		);
	}
}

export default TaskManager;
