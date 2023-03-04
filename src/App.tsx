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
import SidebarHeaderFooter from './Components/extraComponents';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchProjects());
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SidebarHeaderFooter />}>
						<Route path="/" element={<TaskManager />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
