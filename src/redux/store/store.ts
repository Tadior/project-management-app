import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ExampleReducer from '../reducer/ExampleSlice';
import { manaApi } from '../query/Query';
export const rootReducer = combineReducers({
  ExampleReducer,
  [manaApi.reducerPath]: manaApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(manaApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
