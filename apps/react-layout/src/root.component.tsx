import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "components";
import "./assets/global.scss";

export default function Root(props) {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
