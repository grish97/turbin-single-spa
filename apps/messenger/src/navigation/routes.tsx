import { FC } from "react";
import {Navigate, Route} from "react-router-dom";

// ** Layouts
import MainLayout from "components/MainLayout";

// ** Pages
import Messenger from "pages/Messenger";
import { RouteObject } from "react-router/lib/router";

export const routes: RouteObject[] = [
  {
    element: <MainLayout/>,
    children: [
      {path: "/", element: <Navigate to="/messenger" replace/>},
      {path: "/messenger", element: <Messenger/>}
    ],
  }
];

export const RouteElements: FC = () => {
  return (
    <Route element={<MainLayout/>}>
      <Route path="/messenger" element={<Messenger/>} />
    </Route>
  );
};