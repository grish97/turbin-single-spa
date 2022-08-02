import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import { IAuthSate } from "@auth";
import { RootState } from "storage";


const initialState: IAuthSate = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<IAuthSate>) => {
      state.user = payload.user;
      state.token = payload.token;
    }
  }
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;