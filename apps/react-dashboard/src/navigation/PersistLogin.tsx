import { Outlet } from "react-router-dom";
import { usePersistLogin, useAuth } from "@turbo/services";

export const PersistLogin = () => {
  const { isLoading } = usePersistLogin();
  const { authState } = useAuth();

  return !authState.persist
    ? <Outlet />
    : isLoading
      ? <p>Loading...</p>
      : <Outlet />
};