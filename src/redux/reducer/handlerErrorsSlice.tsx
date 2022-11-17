import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHandlerErrorsState {
  statusCode: number;
  message: string;
}

const initialState: IHandlerErrorsState = {
  statusCode: 0,
  message: '',
};

export const handlerErrorsSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    handlerErrors(state, { payload: { statusCode, message } }: PayloadAction<IHandlerErrorsState>) {
      state.statusCode = statusCode;
      switch (statusCode) {
        case 401:
          console.log('перенаправляю пользователя на вход');
          break;
        case 409:
          console.log('делаю что-то');
          break;
        default:
          break;
      }
    },
  },
});

export default handlerErrorsSlice.reducer;
export const { handlerErrors } = handlerErrorsSlice.actions;
