import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "storage";
import { Navigation } from "navigation";
import "./root.style.scss";

export default function Root(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}
