import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

type Tickets = {
	_id: string;
	title: string;
	summary: string;
	description: string;
	priority: string;
	status: string;
	owner: string;
	assignedTo: string;
	created: number;
	completed: boolean;
	assigned: boolean;
	currentFocus: boolean;
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
		createTicket: (state, action: PayloadAction<Tickets>) => {
			state.tickets.push(action.payload);
		},
		updateProjectTickets: (state, action: PayloadAction<Tickets>) => {
			let updatedTicket = action.payload;
			let updatedTickets = state.tickets.map((ticket) =>
				ticket._id === updatedTicket._id ? updatedTicket : ticket
			);
			return { ...state, tickets: updatedTickets };
		},
	},
});

export const { addProjectTickets, createTicket, updateProjectTickets } =
	ticketSlice.actions;
export default ticketSlice.reducer;
