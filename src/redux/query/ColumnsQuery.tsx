import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '../../helper/Helper';
import { columnApi, createColumnApi, createColumnSetApi } from '../../types/types';
export const ColumnsQuery = createApi({
  reducerPath: 'Columns',
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
    getColumns: builder.mutation<columnApi[], { id: string }>({
      query: (args) => ({
        url: `boards/${args.id}/columns`,
        method: 'GET',
      }),
    }),
    createColumn: builder.mutation<columnApi[], { id: string; body: createColumnApi }>({
      query: (args) => ({
        url: `boards/${args.id}/columns`,
        method: 'POST',
        body: args.body,
      }),
    }),
    getColumnById: builder.mutation<columnApi, { boardId: string; columnId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}`,
        method: 'GET',
      }),
    }),
    updateColumnById: builder.mutation<
      columnApi,
      { boardId: string; columnId: string; body: createColumnApi }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteColumnById: builder.mutation<columnApi, { boardId: string; columnId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}`,
        method: 'DELETE',
      }),
    }),
    getColumnSet: builder.mutation<columnApi[], { ids: string[]; userId: string }>({
      query: (args) => ({
        url: `columnsSet?ids=${args.ids.join(',')}&userId=${args.userId};`,
        method: 'GET',
      }),
    }),
    updateColumnSet: builder.mutation<columnApi[], { body: { _id: string; order: number } }>({
      query: (args) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body: args.body,
      }),
    }),
    createColumnSet: builder.mutation<columnApi[], { body: createColumnSetApi }>({
      query: (args) => ({
        url: `columnsSet`,
        method: 'POST',
        body: args.body,
      }),
    }),
  }),
});

export const {
  useGetColumnsMutation,
  useCreateColumnMutation,
  useGetColumnByIdMutation,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useGetColumnSetMutation,
  useUpdateColumnSetMutation,
  useCreateColumnSetMutation,
} = ColumnsQuery;
