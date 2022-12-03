import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../helper/Helper';
import { boardApi, boardsApi } from '../../types/types';
export const BoardsQuery = createApi({
  reducerPath: 'Boards',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.onrender.com/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getBoards: builder.mutation<boardsApi[], void>({
      query: () => ({
        url: `boards`,
        method: 'GET',
      }),
    }),
    createBoard: builder.mutation<boardsApi, boardApi>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoardById: builder.mutation<boardsApi, { id: string }>({
      query: (args) => ({
        url: `boards/${args.id}`,
        method: 'GET',
      }),
    }),
    updateBoardById: builder.mutation<boardsApi, { id: string; body: boardApi }>({
      query: (args) => ({
        url: `boards/${args.id}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteBoardById: builder.mutation<boardsApi, { id: string }>({
      query: (args) => ({
        url: `boards/${args.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoardsSet: builder.mutation<boardsApi[], { ids: string[] }>({
      query: (args) => ({
        url: `boardsSet?ids=${args.ids.join('&')}`,
        method: 'GET',
      }),
    }),
    getBoardsSetById: builder.query<boardsApi[], { id: string }>({
      query: (args) => ({
        url: `boardsSet/${args.id}`,
        method: 'GET',
      }),
      providesTags: ['Boards'],
    }),
  }),
});

export const {
  useGetBoardsMutation,
  useCreateBoardMutation,
  useGetBoardByIdMutation,
  useUpdateBoardByIdMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsSetMutation,
  useGetBoardsSetByIdQuery,
} = BoardsQuery;
