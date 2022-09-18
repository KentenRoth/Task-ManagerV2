import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/app.css';

// Route Components
import Login from './Pages/login';
import SignUp from './Pages/signUp';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
