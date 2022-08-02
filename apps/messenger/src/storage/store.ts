import {configureStore, combineReducers, Middleware, ReducersMapObject} from "@reduxjs/toolkit";
import { sourceApi } from "./services/sourceApi";
import authReducer from "storage/slices/authSlice";

export const reducers: ReducersMapObject = {
  [sourceApi.reducerPath]: sourceApi.reducer,
  auth: authReducer
};

export const middlewares: Middleware[] = [
  sourceApi.middleware,
];

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares)
});
