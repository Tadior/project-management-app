import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';
import { deleteCookie } from '../../helper/Helper';
import { setIsTokenExpired } from '../reducer/UserSlice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload;
    if (data.statusCode === 403 && data.message === 'Invalid token') {
      deleteCookie('token');
      window.location.pathname = '/signIn';
      api.dispatch(setIsTokenExpired(true));
    }
  }
  return next(action);
};
