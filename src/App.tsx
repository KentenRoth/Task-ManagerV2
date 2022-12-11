import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './sass/app.sass';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProjects } from './features/projectSlice';

// Route Components
import Login from './Pages/login';
import SignUp from './Pages/signUp';
import TaskManager from './Pages/project';
import { AppDispatch } from './app/store';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchProjects());
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TaskManager />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
