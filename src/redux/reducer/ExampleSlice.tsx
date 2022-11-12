import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IExampleState {
  firstName: string;
  lastName: string;
  age: number;
  count: number;
}

const initialState: IExampleState = {
  firstName: '',
  lastName: '',
  age: 1,
  count: 0,
};

export const ExampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    setTokenToCookie(state, action: PayloadAction<{ token: string }>) {
      document.cookie = `token=${action.payload.token}; path=/;`;
    },
    // getUsers(state, action: PayloadAction<{ token: string }>) {
    //   console.log('--------------------');
    //   console.log(action.payload);
    // },
  },
});

export default ExampleSlice.reducer;
