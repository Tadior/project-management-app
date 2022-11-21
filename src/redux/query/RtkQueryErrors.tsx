import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { handlerErrors } from '../reducer/handlerErrorsSlice';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload;
    if (data.statusCode === 401) {
      toast(data.message);
    }
    // api.dispatch(push('/welcomePage'));
  }
  return next(action);
};
