import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '../../helper/Helper';
import { PointApi } from '../../types/types';
interface createPointBody {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}
interface updateSetOfPointsBody {
  _id: string;
  done: boolean;
}
interface updatePointByIdBody {
  _id: string;
  done: boolean;
}
interface updatePointByIdResponse {
  _id: string;
  done: boolean;
  order: number;
  boardId: string;
}
interface deletePointByIdResponse {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}
export const PointsQuery = createApi({
  reducerPath: 'Points',
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
    getPoints: builder.mutation<PointApi[], { ids?: string[]; userId?: string }>({
      query: (args) => ({
        url: `points?${args.ids && 'ids=' + args.ids.join(',') + '&'}${
          args.userId && 'userId=' + args.userId + '&'
        }`,
        method: 'GET',
      }),
    }),
    createPoint: builder.mutation<PointApi, createPointBody>({
      query: (args) => ({
        url: `points`,
        method: 'POST',
        body: args,
      }),
    }),
    updateSetOfPoints: builder.mutation<PointApi, updateSetOfPointsBody>({
      query: (args) => ({
        url: `points`,
        method: 'PATCH',
        body: args,
      }),
    }),
    getPointsByTaskId: builder.mutation<PointApi[], { taskId: string }>({
      query: (args) => ({
        url: `points/${args.taskId}`,
        method: 'GET',
      }),
    }),
    updatePointById: builder.mutation<
      updatePointByIdResponse,
      { pointId: string; body: updatePointByIdBody }
    >({
      query: (args) => ({
        url: `points/${args.pointId}`,
        method: 'PATCH',
        body: args.body,
      }),
    }),
    deletePointById: builder.mutation<deletePointByIdResponse, { pointId: string }>({
      query: (args) => ({
        url: `points/${args.pointId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPointsMutation,
  useCreatePointMutation,
  useUpdateSetOfPointsMutation,
  useGetPointsByTaskIdMutation,
  useUpdatePointByIdMutation,
  useDeletePointByIdMutation,
} = PointsQuery;
