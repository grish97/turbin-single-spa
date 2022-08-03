import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "auth/hooks";

export const PrivateNavigation = () => {
  const { authState } = useAuth();

  return authState.user?.isLogged ? <Outlet /> : <Navigate to="/auth/signin" />;
}
