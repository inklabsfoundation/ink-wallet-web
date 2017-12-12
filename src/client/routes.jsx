import React from "react";
import { Route, IndexRoute} from "react-router";
import Home from "./components/home/home";
import Page from "./components/common/page";

export const ROUTE_URLS = {
  MAIN_PAGE: "/"
};

export const routes = (
  <Route path={ROUTE_URLS.MAIN_PAGE} component={Page}>
    <IndexRoute component={Home}/>
  </Route>);
