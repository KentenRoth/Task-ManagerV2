import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

import SoloBoard from '../Components/soloBoard';
import TeamBoard from '../Components/teamBoard';
import { useState, useEffect } from 'react';

const TaskManager = () => {
	const [soloOrTeam, setSoloOrTeam] = useState<string>('');
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
		if (JSON.stringify(hasTeam) === '{}') {
			return;
		}
		if (!hasTeam) {
			console.log('No Project');
		}
		if (hasTeam.admins?.length !== 0 || hasTeam.teams?.length !== 0) {
			setSoloOrTeam('Team');
			return;
		}
		setSoloOrTeam('Solo');
	};

	return (
		<>
			<section className="task-manager">
				<div className="task-manager_container">
					{soloOrTeam === 'Team' ? (
						<TeamBoard />
					) : soloOrTeam === 'Solo' ? (
						<SoloBoard id={hasTeam._id} />
					) : (
						<div></div>
					)}
				</div>
			</section>
		</>
	);
};

export default TaskManager;
