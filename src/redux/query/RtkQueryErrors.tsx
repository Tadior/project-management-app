import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { handlerErrors } from '../reducer/handlerErrorsSlice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload;
    api.dispatch(handlerErrors(data));
  }
  return next(action);
};
