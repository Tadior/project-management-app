import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '../../helper/Helper';
import { boardApi, boardsApi } from '../../types/types';
export const BoardsQuery = createApi({
  reducerPath: 'Boards',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.up.railway.app/',
    prepareHeaders: (headers) => {
      const token = getCookieToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    }),
    getBoardsSet: builder.mutation<boardsApi[], { ids: string[] }>({
      query: (args) => ({
        url: `boardsSet?${args.ids.join('&')}`,
        method: 'GET',
      }),
    }),
    getBoardsSetById: builder.mutation<boardsApi[], { id: string }>({
      query: (args) => ({
        url: `boardsSet/ids=${args.id}`,
        method: 'GET',
      }),
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
  useGetBoardsSetByIdMutation,
} = BoardsQuery;
