import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApiState } from '../../types/types';

interface IState {
  userData: userApiState;
}

const initialState: IState = {
  userData: {
    _id: '',
    name: '',
    login: '',
    password: '',
  },
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userApiState>) {
      state.userData = action.payload;
    },
  },
});

export default userSlice.reducer;
