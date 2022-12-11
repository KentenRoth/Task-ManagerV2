import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosUser from '../axios/axiosUser';

interface Projects {
	_id: string;
	created: number;
	owner: string;
	title: string;
	admin?: string[];
	team?: string[];
	tokens: Array<Tokens>;
}

interface Tokens {
	_id: string;
	token: string;
}

type InitialState = {
	projects: Projects[];
	loading: boolean;
	error: string;
};

const initialState: InitialState = {
	projects: [],
	loading: false,
	error: '',
};

export const fetchProjects = createAsyncThunk('projects/getProjects', () => {
	return axiosUser.get('/projects').then((res) => res.data);
});

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(
			fetchProjects.fulfilled,
			(state, action: PayloadAction<Projects[]>) => {
				state.loading = true;
				state.projects = action.payload;
				state.error = '';
			}
		);

		builder.addCase(fetchProjects.rejected, (state, action) => {
			state.loading = true;
			state.projects = [];
			state.error = action.error.message || 'Something went wrong';
		});
	},
	reducers: {
		addNewProject: (state, action: PayloadAction<Projects>) => {
			state.projects.push(action.payload);
		},
	},
});

// export const { addNewProject } = projectsSlice.actions;

export default projectsSlice.reducer;
