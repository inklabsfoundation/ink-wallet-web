import React from "react";
import { Route, IndexRoute} from "react-router";
import Home from "./components/home/home-page";
import Page from "./components/common/page";
import CreateWalletPanel from "./components/create-wallet/create-wallet-pannel";
import RestoreWalletPanel from "./components/restore-wallet/restore-wallet-panel";
import MainPage from "./components/main/main-page";
import LoginPanel from "./components/login/login-panel";
import MainPagePanel from "./components/main/main-page-panel";
import SecurityCenter from "./components/security-center/security-center";
import AssetsDetails from "./components/assets-details/assets-details";
import About from "./components/about/about";
import Policy from "./components/privacy-policy/policy";
import Terms from "./components/terms-of-usage/terms";
import FAQ from "./components/faq/faq";

export const ROUTE_URLS = {
  HOME_PAGE: "/",
  CREATE_WALLET_PAGE: "/create-wallet",
  RESTORE_WALLET_PAGE: "/restore-wallet",
  WALLET_PAGE: "/wallet",
  SECURITY_CENTER: "security",
  LOGIN: "/login",
  ASSETS_DETAILS: "details",
  ABOUT: "about",
  POLICY: "policy",
  TERMS: "terms",
  FAQ: "faq"
};

export const routes = (
  <Route path={ROUTE_URLS.HOME_PAGE} component={Page}>
    <IndexRoute component={Home}/>
    <Route path={ROUTE_URLS.CREATE_WALLET_PAGE} component={CreateWalletPanel}/>
    <Route path={ROUTE_URLS.LOGIN} component={LoginPanel}/>
    <Route path={ROUTE_URLS.RESTORE_WALLET_PAGE} component={RestoreWalletPanel}/>
    <Route path={ROUTE_URLS.WALLET_PAGE} component={MainPage}>
      <IndexRoute component={MainPagePanel}/>
      <Route path={ROUTE_URLS.SECURITY_CENTER} component={SecurityCenter}/>
      <Route path={`${ROUTE_URLS.ASSETS_DETAILS}/:currency`} component={AssetsDetails}/>
      <Route path={ROUTE_URLS.ABOUT} component={About}/>
      <Route path={ROUTE_URLS.POLICY} component={Policy}/>
      <Route path={ROUTE_URLS.TERMS} component={Terms}/>
      <Route path={ROUTE_URLS.FAQ} component={FAQ}/>
    </Route>
  </Route>
);
