import {store, reducers, middlewares} from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  store,
  reducers,
  middlewares
};