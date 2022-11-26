import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import INITIAL_VALUE from '../../pages/ProjectsPage/consts/INITIAL_VALUE';
import { columnApiWithTasks, TaskApi } from '../../types/types';

export interface IState {
  currentTask: TaskApi;
  currentColumn: columnApiWithTasks;
}
const initialTask: TaskApi = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
  columnId: '',
  description: '',
  userId: '',
  users: [],
};

const initialState: IState = {
  currentTask: initialTask,
  currentColumn: INITIAL_VALUE[0],
};

export const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<TaskApi>) => {
      state.currentTask = action.payload;
    },
    setCurrentColumn: (state, action: PayloadAction<columnApiWithTasks>) => {
      state.currentColumn = action.payload;
    },
  },
});

export default ProjectSlice.reducer;
export const { setCurrentTask, setCurrentColumn } = ProjectSlice.actions;
