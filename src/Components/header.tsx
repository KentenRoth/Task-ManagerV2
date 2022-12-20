import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Header = () => {
	const title = useSelector((state: RootState) => {
		if (!state.projects.currentProject.title) {
			return ' ';
		}
		return state.projects.currentProject.title;
	});

	return <div className="header">{title}</div>;
};

export default Header;
