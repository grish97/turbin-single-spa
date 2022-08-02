import { BrowserRouter } from "react-router-dom";
import { Navigation } from "navigation";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}
