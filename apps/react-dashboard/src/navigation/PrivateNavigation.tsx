import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@turbo/services";

export const PrivateNavigation = () => {
  const { authState } = useAuth();

  return authState.user ? <Outlet /> : <Navigate to="/auth/signin" />;
}
