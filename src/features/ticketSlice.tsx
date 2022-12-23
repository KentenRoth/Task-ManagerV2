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
	reducers: {
		addProjectTickets: (state, action: PayloadAction<Tickets[]>) => {
			state.tickets = action.payload;
		},
	},
});

export const { addProjectTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
