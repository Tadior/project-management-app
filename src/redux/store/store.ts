import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AuthQuery } from '../query/AuthQuery';
import { BoardsQuery } from '../query/BoardsQuery';
import { ColumnsQuery } from '../query/ColumnsQuery';
import { PointsQuery } from '../query/PointsQuery';
import { FilesQuery } from '../query/FilesQuery';
import { TaskQuery } from '../query/TasksQuery';
import { UsersQuery } from '../query/UsersQuery';
import handlerErrorsReducer from '../reducer/handlerErrorsSlice';
import userReducer from '../reducer/UserSlice';
import { rtkQueryErrorLogger } from '../query/RtkQueryErrors';

import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

export const rootReducer = combineReducers({
  handlerErrorsReducer,
  userReducer,
  routerReducer,
  [AuthQuery.reducerPath]: AuthQuery.reducer,
  [BoardsQuery.reducerPath]: BoardsQuery.reducer,
  [ColumnsQuery.reducerPath]: ColumnsQuery.reducer,
  [FilesQuery.reducerPath]: FilesQuery.reducer,
  [PointsQuery.reducerPath]: PointsQuery.reducer,
  [TaskQuery.reducerPath]: TaskQuery.reducer,
  [UsersQuery.reducerPath]: UsersQuery.reducer,
});

const middlewareItems = [
  AuthQuery.middleware,
  BoardsQuery.middleware,
  ColumnsQuery.middleware,
  FilesQuery.middleware,
  PointsQuery.middleware,
  TaskQuery.middleware,
  UsersQuery.middleware,
  rtkQueryErrorLogger,
  routerMiddleware,
];

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewareItems),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
const store = setupStore();
export const history = createReduxHistory(store);
