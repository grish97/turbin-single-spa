import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "auth/hooks";

export const PrivateNavigation = ({ children }: any) => {
  const { observable$ } = useAuth();

  // return observable$.getValue().user ? <Outlet /> : <Navigate to="/auth/signin" />;
  return observable$.getValue().user ? <Outlet /> : <Navigate to="/auth/signin" />;
}
