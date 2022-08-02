import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routing from 'navigation/Routing';
import { store } from "storage";
import './index.scss';

export default function Root(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </Provider>
  );
}
