import axios from 'axios';

const fetchTickets = () => {
	const defaultOption = {
		baseURL: 'http://localhost:3000',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	let instance = axios.create(defaultOption);

	instance.interceptors.request.use(function (config) {
		const token = localStorage.getItem('projectID');
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	return instance;
};

export default fetchTickets();
