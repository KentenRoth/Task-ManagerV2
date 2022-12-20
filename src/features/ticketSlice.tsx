import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Tickets = {
	_id: string;
	summary: string;
	description: string;
	priority: string;
	status: string;
	owner: string;
	created: number;
	completed: boolean;
	assigned: boolean;
};

type InitialState = {
	tickets: Tickets[];
};

const initialState: InitialState = {
	tickets: [],
};

export const ticketSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {},
});

export default ticketSlice.reducer;
