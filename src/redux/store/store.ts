import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ExampleReducer from '../reducer/ExampleSlice';

export const rootReducer = combineReducers({
  ExampleReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
