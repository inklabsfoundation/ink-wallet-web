import React from "react";
import { Route, IndexRoute} from "react-router";
import Home from "./components/home/home";
import Page from "./components/common/page";
import CreateWalletPanel from "./components/create-wallet/create-wallet";

export const ROUTE_URLS = {
  MAIN_PAGE: "/",
  CREATE_WALLET_PAGE: "/create-wallet"
};

export const routes = (
  <Route path={ROUTE_URLS.MAIN_PAGE} component={Page}>
    <IndexRoute component={Home}/>
    <Route path={ROUTE_URLS.CREATE_WALLET_PAGE} component={CreateWalletPanel}/>
  </Route>);
