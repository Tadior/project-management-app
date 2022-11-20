import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '../../helper/Helper';
import { userApi, userProfileApi } from '../../types/types';
export const UsersQuery = createApi({
  reducerPath: 'User',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.up.railway.app/users',
    prepareHeaders: (headers) => {
      const token = getCookieToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.mutation<userApi[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    getUserByid: builder.mutation<userApi, { id: string }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'GET',
      }),
    }),
    updateUserByid: builder.mutation<userProfileApi, { id: string; body: userProfileApi }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteUserByid: builder.mutation<userApi, { id: string }>({
      query: (args) => ({
        url: `/${args.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useUpdateUserByidMutation,
  useDeleteUserByidMutation,
  useGetUserByidMutation,
} = UsersQuery;
