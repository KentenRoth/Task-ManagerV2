import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import SoloBoard from '../Components/soloBoard';
import TeamBoard from '../Components/teamBoard';
import { useState, useEffect } from 'react';

const TaskManager = () => {
	const [soloOrTeam, setSoloOrTeam] = useState(Boolean);
	const hasTeam = useSelector(
		(state: RootState) => state.projects.currentProject
	);

	useEffect(() => {
		teamCheck();
	}, []);

	useEffect(() => {
		teamCheck();
	}, [hasTeam]);

	const teamCheck = () => {
		if (hasTeam.admins?.length !== 0 || hasTeam.teams?.length !== 0) {
			setSoloOrTeam(true);
			return;
		}
		setSoloOrTeam(false);
	};

	console.log(hasTeam);

	return (
		<>
			<section className="task-manager">
				<div className="task-manager_container">
					{soloOrTeam ? <TeamBoard /> : <SoloBoard />}
				</div>
			</section>
		</>
	);
};

export default TaskManager;
