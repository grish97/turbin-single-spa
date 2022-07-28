import { createSlice } from "@reduxjs/toolkit";
import { TAuthState } from "@store";

const initialState: TAuthState = {
  id: "",
  username: "",
  email: "",
  accessToken: "",
  isLogged: false,
  persist: localStorage.getItem("persist") === "true" || false,
  roles: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state: TAuthState, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state: TAuthState) => {
      return initialState;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
