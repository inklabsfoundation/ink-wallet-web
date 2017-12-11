import React from "react";
import { render } from "react-dom";
import { routes } from "./routes";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import configureStore from "./configureStore";


window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = configureStore(initialState);
  render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );
};
