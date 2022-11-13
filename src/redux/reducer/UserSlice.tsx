import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../types/types';

interface IState {
  userData: userApi;
}

const initialState: IState = {
  userData: {
    _id: '',
    name: '',
    login: '',
  },
};

export const ExampleSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userApi>) {
      state.userData = action.payload;
    },
  },
});

export default ExampleSlice.reducer;
