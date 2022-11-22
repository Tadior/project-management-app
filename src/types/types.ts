export type teamMember = {
  img: string;
  name: string;
  position: string;
  role: string;
  github: string;
};
export interface userApi {
  login: string;
  name: string;
  _id: string;
}

export interface userProfileApi {
  login: string;
  name: string;
  password: string;
}

export interface userApiState {
  login: string;
  name: string;
  password: string;
  _id: string;
}

export interface boardsApi extends boardApi {
  _id: string;
}
export interface boardApi {
  title: string;
  owner: string;
  users: string[];
}
export interface columnApi extends createColumnApi {
  _id: string;
  boardId: string;
}
export interface createColumnApi {
  title: string;
  order: number;
}
export interface createColumnSetApi {
  title: string;
  order: number;
  boardId: string;
}
export interface TaskApi {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}
export interface FileApi {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}
export interface PointApi {
  _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface Error {
  status?: number;
}
