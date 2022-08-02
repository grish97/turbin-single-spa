import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute: FC = () => {
  const isLogged = true;

  return isLogged ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
