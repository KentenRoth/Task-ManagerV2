import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './sass/app.sass';

// Route Components
import Login from './Pages/login';
import SignUp from './Pages/signUp';
import TaskManager from './Pages/project';

function App() {
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
