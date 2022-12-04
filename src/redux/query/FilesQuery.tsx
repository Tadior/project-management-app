import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../helper/Helper';
import { FileApi } from '../../types/types';
export const FilesQuery = createApi({
  reducerPath: 'Files',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mana-project-back.up.railway.app/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFiles: builder.mutation<FileApi[], { ids?: string[]; userId?: string; taskId: string }>({
      query: (args) => ({
        url: `file/?${args.ids && 'ids=' + args.ids.join(',')}${
          args.taskId && 'taskId=' + args.taskId + '&'
        }${args.userId && 'userId=' + args.userId + '&'}`,
        method: 'GET',
      }),
    }),
    uploadFile: builder.mutation<
      FileApi[],
      { body: { boardId: string; taskId: string; file: string } }
    >({
      query: (args) => ({
        url: `file`,
        method: 'POST',
        body: args.body,
      }),
    }),
    getFileById: builder.mutation<FileApi[], { boardId: string }>({
      query: (args) => ({
        url: `file/${args.boardId}`,
        method: 'GET',
      }),
    }),
    deleteFileById: builder.mutation<FileApi, { fileId: string }>({
      query: (args) => ({
        url: `file/${args.fileId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFilesMutation,
  useUploadFileMutation,
  useGetFileByIdMutation,
  useDeleteFileByIdMutation,
} = FilesQuery;
