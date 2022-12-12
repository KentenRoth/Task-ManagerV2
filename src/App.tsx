import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './sass/app.sass';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Store and Fetching
import { AppDispatch } from './app/store';
import { fetchProjects } from './features/projectSlice';

// Route Components
import Login from './Pages/login';
import SignUp from './Pages/signUp';
import TaskManager from './Pages/project';
import Sidebar from './Components/sidebar';
import Header from './Components/header';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchProjects());
	}, []);

	return (
		<>
			<BrowserRouter>
				<Header />
				<div className="appContent">
					<Sidebar />
					<Routes>
						<Route path="/" element={<TaskManager />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
