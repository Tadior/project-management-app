import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApiState } from '../../types/types';

interface IState {
  userData: userApiState;
  activeProjectId: string;
  isTokenExpired: boolean;
}

const initialState: IState = {
  userData: {
    _id: '',
    name: '',
    login: '',
    password: '',
  },
  activeProjectId: '',
  isTokenExpired: false,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userApiState>) {
      state.userData = action.payload;
    },
    setActiveProjectId(state, action: PayloadAction<string>) {
      state.activeProjectId = action.payload;
    },
    resetUserData(state) {
      state.userData = initialState.userData;
    },
    setIsTokenExpired(state, action: PayloadAction<boolean>) {
      state.isTokenExpired = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setIsTokenExpired } = userSlice.actions;
