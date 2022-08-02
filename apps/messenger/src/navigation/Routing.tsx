import { FC } from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import MainLayout from "components/MainLayout";
import { PrivateRoute } from "navigation/PrivateRoute";

// pages
import Messenger from "pages/Messenger";

const Routing: FC = () => {

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout/>}>
          <Route path="/messenger" element={<Messenger/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
