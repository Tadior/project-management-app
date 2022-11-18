import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../types/types';

interface IState {
  userData: userApi;
  activeProjectId: string;
}

const initialState: IState = {
  userData: {
    _id: '',
    name: '',
    login: '',
    password: '',
  },
  activeProjectId: '',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userApi>) {
      state.userData = action.payload;
    },
    setActiveProjectId(state, action: PayloadAction<string>) {
      state.activeProjectId = action.payload;
    },
  },
});

export default userSlice.reducer;
