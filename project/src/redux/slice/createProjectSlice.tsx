import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Milestone,
  UserDetails,
  Task,
  ProjectObject,
  ModalState,
  RemoveProjectsPayload,
  UpdateBulkPayload,
} from '../../components/constant/bulkActions';

const initialState: ModalState = {
  projects: [],
};

const modalSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects(state, action: PayloadAction<ProjectObject[]>) {
      const uniqueProjects = action.payload
        .filter((newProject) => (
          !state.projects
            .some((existingProject) => existingProject.project_id === newProject.project_id)
        ));
      state.projects.unshift(...uniqueProjects);
    },
    addProject(state, action: PayloadAction<ProjectObject>) {
      const newProject = action.payload;
      const isDuplicate = state.projects
        .some((existingProject) => existingProject.project_id === newProject.project_id);
      if (!isDuplicate) {
        state.projects.unshift(newProject);
      }
    },
    updateProject(state, action: PayloadAction<ProjectObject>) {
      const updatedProject = action.payload;
      const index = state.projects.findIndex(
        (project) => project.project_id === updatedProject.project_id,
      );

      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
    },
    removeProjectsByIds(state, action: PayloadAction<RemoveProjectsPayload>) {
      const { ids } = action.payload;
      state.projects = state.projects.filter((project) => !ids.includes(project.project_id));
    },
    resetProjects(state) {
      state.projects = [];
    },
    updateBulkProjects(state, action: PayloadAction<UpdateBulkPayload>) {
      const { filteredObject, selectedRowsIds } = action.payload;
      const updatedArray = state.projects.map((obj) => (selectedRowsIds.includes(obj.project_id)
        ? { ...obj, ...filteredObject }
        : { ...obj }));
      state.projects = updatedArray;
    },
    archiveProjects(state, action) {
      const { selectedRowsIds } = action.payload;
      // console.log('selectedRowsIds', selectedRowsIds);
      const updatedArray = state.projects.map((obj) => (action.payload.includes(obj.project_id)
        ? { ...obj, archived: true, active: false }
        : { ...obj }));
      state.projects = updatedArray;
    },

  },
});

export const {
  addProject,
  updateProject,
  resetProjects,
  removeProjectsByIds,
  updateBulkProjects,
  archiveProjects,
  addProjects,
} = modalSlice.actions;

export default modalSlice.reducer;
