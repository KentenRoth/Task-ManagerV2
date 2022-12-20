import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projectSlice';
import ticketReducer from '../features/ticketSlice';

export const store = configureStore({
	reducer: {
		projects: projectsReducer,
		tickets: ticketReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
