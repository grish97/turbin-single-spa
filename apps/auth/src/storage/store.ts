import {
  combineReducers,
  configureStore,
  Middleware,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";

export const reducers: ReducersMapObject = {
  auth: authSlice.reducer,
};

export const middlewares: Middleware[] = [];

const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
