import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@turbo/services";

export const PrivateRoute: FC = () => {
  const { authState } = useAuth();

  return authState.user?.id ? <Outlet /> : <Navigate to="/auth/signin" />;
};
