import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

const SidebarHeaderFooter = () => {
	return (
		<>
			<Sidebar />
			<div className="appContent">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default SidebarHeaderFooter;
