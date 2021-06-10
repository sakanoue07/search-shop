import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { store, history } from "./redux/store/store";
import { ConnectedRouter } from "connected-react-router";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.querySelector("#root")
  );
});
