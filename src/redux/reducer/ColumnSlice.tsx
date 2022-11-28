import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isCurrentColumn: boolean;
}

const initialState: IState = {
  isCurrentColumn: false,
};

export const ColumnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsCurrentColumn: (state, action: PayloadAction<boolean>) => {
      state.isCurrentColumn = action.payload;
    },
  },
});

export default ColumnSlice.reducer;
export const { setIsCurrentColumn } = ColumnSlice.actions;
