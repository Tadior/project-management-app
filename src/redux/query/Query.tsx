import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'inspector';
import { RootState } from '../store/store';
import { useAppSelector } from '../../hooks/redux';
import { getCookieToken } from '../cookie/cookieFunc';
import {
  boardsApi,
  boardApi,
  userApi,
  columnApi,
  createColumnApi,
  createColumnSetApi,
  taskApi,
  fileApi,
  pointApi,
} from '../../types/types';
interface updateTaskByIdBody extends createTasksBody {
  columnId: string;
}
interface createTasksBody {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
}
interface updateTasksSetBody {
  _id: string;
  order: number;
  columnId: string;
}
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
// interface test {
//   auth: { token: string };
// }
// const { lastName, firstName, age, count } = useAppSelector((state) => state.ExampleReducer);
export const manaApi = createApi({
  reducerPath: 'users',
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
    signIn: builder.mutation<{ token: string }, { login: string; password: string }>({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<userApi, { name: string; login: string; password: string }>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),
    getUsers: builder.mutation<userApi[], void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
    }),
    getUserByid: builder.mutation<userApi, { id: string }>({
      query: (args) => ({
        url: `users/${args.id}`,
        method: 'GET',
      }),
    }),
    updateUserByid: builder.mutation<userApi, { id: string; body: userApi }>({
      query: (args) => ({
        url: `users/${args.id}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteUserByid: builder.mutation<userApi, { id: string }>({
      query: (args) => ({
        url: `users/${args.id}`,
        method: 'DELETE',
      }),
    }),
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
    getTasks: builder.mutation<taskApi[], { boardId: string; columnId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks`,
        method: 'GET',
      }),
    }),
    createTask: builder.mutation<
      taskApi,
      { boardId: string; columnId: string; body: createTasksBody }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks`,
        method: 'POST',
        body: args.body,
      }),
    }),
    getTaskById: builder.mutation<taskApi, { boardId: string; columnId: string; taskId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'GET',
      }),
    }),
    updateTaskById: builder.mutation<
      taskApi,
      { boardId: string; columnId: string; taskId: string; body: updateTaskByIdBody }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteTaskById: builder.mutation<
      taskApi,
      { boardId: string; columnId: string; taskId: string }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'DELETE',
      }),
    }),
    getTasksSet: builder.mutation<taskApi[], { ids: string[]; userId: string; search: string }>({
      query: (args) => ({
        url: `tasksSet?ids=${args.ids.join(',')}&userId=${args.userId}&search=${args.search}`,
        method: 'GET',
      }),
    }),
    updateTasksSet: builder.mutation<taskApi[], { body: updateTasksSetBody }>({
      query: (args) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: args.body,
      }),
    }),
    getTasksSetByBoardId: builder.mutation<taskApi[], { boardId: string }>({
      query: (args) => ({
        url: `tasksSet/${args.boardId}`,
        method: 'GET',
      }),
    }),
    getFiles: builder.mutation<fileApi[], { ids?: string[]; userId?: string; taskId: string }>({
      query: (args) => ({
        url: `file/?${args.ids && 'ids=' + args.ids.join(',')}${
          args.taskId && 'taskId=' + args.taskId + '&'
        }${args.userId && 'userId=' + args.userId + '&'}`,
        method: 'GET',
      }),
    }),
    uploadFile: builder.mutation<
      fileApi[],
      { body: { boardId: string; taskId: string; file: string } }
    >({
      query: (args) => ({
        url: `file`,
        method: 'POST',
        body: args.body,
      }),
    }),
    getFileById: builder.mutation<fileApi[], { boardId: string }>({
      query: (args) => ({
        url: `file/${args.boardId}`,
        method: 'GET',
      }),
    }),
    deleteFileById: builder.mutation<fileApi, { fileId: string }>({
      query: (args) => ({
        url: `file/${args.fileId}`,
        method: 'DELETE',
      }),
    }),
    getPoints: builder.mutation<pointApi[], { ids?: string[]; userId?: string }>({
      query: (args) => ({
        url: `points?${args.ids && 'ids=' + args.ids.join(',') + '&'}${
          args.userId && 'userId=' + args.userId + '&'
        }`,
        method: 'GET',
      }),
    }),
    createPoint: builder.mutation<pointApi, createPointBody>({
      query: (args) => ({
        url: `points`,
        method: 'POST',
        body: args,
      }),
    }),
    updateSetOfPoints: builder.mutation<pointApi, updateSetOfPointsBody>({
      query: (args) => ({
        url: `points`,
        method: 'PATCH',
        body: args,
      }),
    }),
    getPointsByTaskId: builder.mutation<pointApi[], { taskId: string }>({
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
  // useGetUsersQuery, useSignInMutation
  useSignInMutation,
  useSignUpMutation,
  useGetUsersMutation,
} = manaApi;
