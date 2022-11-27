import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../helper/Helper';
import { TaskApi } from '../../types/types';
import { ICreateTasksBody, updateTaskByIdBody } from '../../types/types';

interface updateTasksSetBody {
  _id: string;
  order: number;
  columnId: string;
}
export const TaskQuery = createApi({
  reducerPath: 'Tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.up.railway.app/',
    prepareHeaders: (headers) => {
      const token = getCookie('token')!;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.mutation<TaskApi[], { boardId: string; columnId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks`,
        method: 'GET',
      }),
    }),
    createTask: builder.mutation<
      TaskApi,
      { boardId: string; columnId: string; body: ICreateTasksBody }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks`,
        method: 'POST',
        body: args.body,
      }),
    }),
    getTaskById: builder.mutation<TaskApi, { boardId: string; columnId: string; taskId: string }>({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'GET',
      }),
    }),
    updateTaskById: builder.mutation<
      TaskApi,
      { boardId: string; columnId: string; taskId: string; body: updateTaskByIdBody }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'PUT',
        body: args.body,
      }),
    }),
    deleteTaskById: builder.mutation<
      TaskApi,
      { boardId: string; columnId: string; taskId: string }
    >({
      query: (args) => ({
        url: `boards/${args.boardId}/columns/${args.columnId}/tasks/${args.taskId}`,
        method: 'DELETE',
      }),
    }),
    getTasksSet: builder.mutation<TaskApi[], { ids: string[]; userId: string; search: string }>({
      query: (args) => ({
        url: `tasksSet?ids=${args.ids.join(',')}&userId=${args.userId}&search=${args.search}`,
        method: 'GET',
      }),
    }),
    updateTasksSet: builder.mutation<TaskApi[], { body: updateTasksSetBody[] }>({
      query: (args) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: args.body,
      }),
    }),
    getTasksSetByBoardId: builder.mutation<TaskApi[], { boardId: string }>({
      query: (args) => ({
        url: `tasksSet/${args.boardId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetTasksMutation,
  useCreateTaskMutation,
  useGetTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetTasksSetMutation,
  useUpdateTasksSetMutation,
  useGetTasksSetByBoardIdMutation,
} = TaskQuery;
