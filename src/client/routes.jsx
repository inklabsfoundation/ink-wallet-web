import React from "react";
import { Route, IndexRoute} from "react-router";
import Home from "./components/home/home-page";
import Page from "./components/common/page";
import CreateWalletPanel from "./components/create-wallet/create-wallet-pannel";
import RestoreWalletPanel from "./components/restore-wallet/restore-wallet-panel";
import MainPage from "./components/main/main-page";
import LoginPanel from "./components/login/login-panel";

export const ROUTE_URLS = {
  HOME_PAGE: "/",
  CREATE_WALLET_PAGE: "/create-wallet",
  RESTORE_WALLET_PAGE: "/restore-wallet",
  MAIN_PAGE: "/wallet",
  LOGIN: "/login"
};

export const routes = (
  <Route path={ROUTE_URLS.HOME_PAGE} component={Page}>
    <IndexRoute component={Home}/>
    <Route path={ROUTE_URLS.CREATE_WALLET_PAGE} component={CreateWalletPanel}/>
    <Route path={ROUTE_URLS.LOGIN} component={LoginPanel}/>
    <Route path={ROUTE_URLS.RESTORE_WALLET_PAGE} component={RestoreWalletPanel}/>
    <Route path={ROUTE_URLS.MAIN_PAGE} component={MainPage}/>
  </Route>);
