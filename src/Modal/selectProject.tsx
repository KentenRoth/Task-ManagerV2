import React from 'react';

interface IProps {
	projects: {
		admin?: string[];
		team?: string[];
		title: string;
		created: number;
		_id: string;
	}[];

	selected(id: string): void;
	show: boolean;
}

interface IState {
	selectedProject: string;
	disabled: boolean;
}

class SelectProject extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			selectedProject: '',
			disabled: true,
		};
	}

	handleChange = (e: { target: HTMLSelectElement }) => {
		if (e.target.value !== 'default') {
			return this.setState({
				selectedProject: e.target.value,
				disabled: false,
			});
		}
		this.setState({ disabled: true });
	};

	selected = () => {
		this.props.selected(this.state.selectedProject);
	};

	render() {
		let showHide = this.props.show
			? 'selectProject'
			: 'selectProject hidden';

		return (
			<div className={showHide}>
				<form>
					<select onChange={this.handleChange}>
						<option value="default">Select A Project</option>
						{this.props.projects.map((x) => {
							return (
								<option key={x._id} value={x._id}>
									{x.title}
								</option>
							);
						})}
					</select>
					<button
						className="purple-button"
						onClick={this.selected}
						type="button"
						disabled={this.state.disabled}
					>
						Select Project
					</button>
				</form>
			</div>
		);
	}
}

export default SelectProject;
