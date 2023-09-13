import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import Board from '../Components/board';
import { useState, useEffect } from 'react';

const TaskManager = () => {
	const [isSolo, setIsSolo] = useState<boolean>(true);
	const team = useSelector(
		(state: RootState) => state.projects.currentProject
	);

	useEffect(() => {
		teamCheck();
	}, [team]);

	const teamCheck = () => {
		if (JSON.stringify(team) === '{}') {
			return;
		}
		if (!team) {
			return;
		}
		if (team.admins?.length !== 0 || team.teams?.length !== 0) {
			setIsSolo(false);
			return;
		}
		setIsSolo(true);
	};

	return (
		<>
			<section className="task-manager">
				<Board id={team._id} isSolo={isSolo} />
			</section>
		</>
	);
};

export default TaskManager;
