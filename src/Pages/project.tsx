import React from 'react';
import axiosUser from '../axios/axiosUser';
import SelectProject from '../Modal/selectProject';

// Show all Tasks for current project
// If no current projects Create Project shows on launch

interface IState {
	loggedIn: boolean;
	projects: Array<Projects>;
	selectProject: boolean;
	title: string;
	tickets: Array<Tickets>;
	currentProject: Projects;
}

interface Projects {
	admin?: string[];
	team?: string[];
	title: string;
	created: number;
	tokens: Array<Tokens>;
	_id: string;
}

interface Tokens {
	_id: string;
	token: string;
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
			selectProject: true,
			loggedIn: true,
			projects: [],
			title: '',
			tickets: [],
			currentProject: {} as Projects,
		};
	}

	componentDidMount() {
		axiosUser.get('/projects').then((res) => {
			this.setState({ projects: res.data });
		});
		// res.data[0].tokens[0].token
	}

	selectedProject = (id: string) => {
		axiosUser.get(`/projects/${id}`).then((res) => {
			if (res.status !== 200) {
				return console.log('Something Went Wrong');
			}
			this.setState({ currentProject: res.data, selectProject: false });
		});
	};

	render() {
		return (
			<>
				<div className="taskManager">
					<SelectProject
						show={this.state.selectProject}
						projects={this.state.projects}
						selected={this.selectedProject}
					/>
				</div>
			</>
		);
	}
}

export default TaskManager;
