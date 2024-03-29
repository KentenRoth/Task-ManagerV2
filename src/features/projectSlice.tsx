import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosUser from '../axios/axiosUser';

import { Projects, CurrentProject } from '../types';

type InitialState = {
	projects: Projects[];
	loading: boolean;
	error: string;
	currentProject: CurrentProject;
};

const initialState: InitialState = {
	projects: [],
	loading: false,
	error: '',
	currentProject: {} as CurrentProject,
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
		currentProject: (state, action: PayloadAction<Projects>) => {
			state.currentProject = action.payload;
		},
		addNewProject: (state, action: PayloadAction<Projects>) => {
			state.projects.push(action.payload);
		},
		addTeamMember: (state, action: PayloadAction<Projects>) => {
			state.currentProject = action.payload;
		},
		updateProjectOrder: (state, action: PayloadAction<Projects>) => {
			let updatedProject = action.payload;
			let updatedProjects = state.projects.map((project) =>
				project._id === updatedProject._id ? updatedProject : project
			);
			return { ...state, projects: updatedProjects };
		},
	},
});

export const {
	currentProject,
	addNewProject,
	addTeamMember,
	updateProjectOrder,
} = projectsSlice.actions;

export default projectsSlice.reducer;
