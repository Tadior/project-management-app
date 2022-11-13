import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '../../helper/Helper';
import { userApi } from '../../types/types';
export const AuthQuery = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.up.railway.app/auth/',
    prepareHeaders: (headers) => {
      const token = getCookieToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, { login: string; password: string }>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<userApi, { name: string; login: string; password: string }>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = AuthQuery;
