import { useSelector, useDispatch } from "react-redux";
import { setAuth as setAuthData, logout } from "storage/slices/authSlice";
import { RootState } from "storage/store";

import { TAuthState } from "@store";

export default function useAuth() {
  const dispatch = useDispatch();
  const authStore = useSelector<RootState, TAuthState>((store) => store.auth);

  function setAuth(payload: Partial<TAuthState>) {
    dispatch(setAuthData(payload));
  }

  function resetAuth() {
    dispatch(logout());
  }

  return { ...authStore, setAuth, resetAuth };
}
