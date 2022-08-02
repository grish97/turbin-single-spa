import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@turbo/services";

export default function PublicNavigation() {
  const { authState } = useAuth();

  return authState.user ? <Navigate to="/" /> : <Outlet />;
}
