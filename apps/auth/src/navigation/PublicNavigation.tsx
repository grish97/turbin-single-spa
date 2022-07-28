import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";

export default function PublicNavigation() {
  const auth = useAuth();

  return auth.isLogged ? <Navigate to="/" /> : <Outlet />;
}
