import React from "react";
import { render } from "react-dom";
import { routes } from "./routes";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Internalizator from "./services/internalizator";


window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = Internalizator.configureIn18n(
    configureStore(initialState),
    initialState.config.defaultLocale
  );
  render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );
};
