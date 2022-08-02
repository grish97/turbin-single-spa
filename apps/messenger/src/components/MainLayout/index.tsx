import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const MainLayout: FC = () => {
  return (
    <div id="application">
      <Outlet />
    </div>
  );
};

export default MainLayout;