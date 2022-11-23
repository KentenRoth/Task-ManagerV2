import React from 'react';
import axiosUser from '../axios/axiosUser';
import SelectProject from '../Modal/selectProject';

// Show all Tasks for current project

interface IState {
	loggedIn: boolean;
	projects: Array<Projects>;
	modal: boolean;
	title: string;
	tickets: Array<Tickets>;
}

interface Projects {
	admin?: string[];
	team?: string[];
	title: string;
	created: number;
	_id: string;
}

interface Tickets {
	created: number;
	summary: string;
	description: string;
	completed: boolean;
	priority: string;
	assigned?: string;
	status?: string;
	assignedTo?: string;
	owner: string;
	_id: string;
}

class TaskManager extends React.Component<{}, IState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			modal: true,
			loggedIn: true,
			projects: [],
			title: '',
			tickets: [],
		};
	}

	componentDidMount() {
		axiosUser.get('/projects').then((res) => {
			this.setState({ projects: res.data });
		});
		// res.data[0].tokens[0].token
	}

	selectedProject = (id: string) => {
		axiosUser.get(`/projects/${id}`).then((res) => console.log(res));
	};

	render() {
		return (
			<>
				<div className="taskManager">
					<SelectProject
						projects={this.state.projects}
						selected={this.selectedProject}
					/>
				</div>
			</>
		);
	}
}

export default TaskManager;
