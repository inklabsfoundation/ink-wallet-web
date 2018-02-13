import ReduxRouterEngine from "electrode-redux-router-engine";
`import {ROUTE_URLS, routes} from "../../client/routes";
import {initialState} from "../../client/initial-state";
import configureStore from "../../client/configureStore";
import Internalizator from "../../client/services/internalizator";
import {config} from "electrode-confippet";
import MobileDetect from "mobile-detect";

const defaultLocale = config.$("settings.defaultLocale");
const derivePath = config.$("settings.derivePath");
const qtumExplorerPath = config.$("settings.qtumExplorerPath");
const encryptSalt = config.$("settings.encryptSalt");
const INKcontractAddress = config.$("settings.INKcontractAddress");
const refreshTime = config.$("settings.refreshTime");
const playMarketDownloadLink = config.$("settings.playMarketDownloadLink");
const newsUrl = config.$("settings.newsUrl");

const Promise = require("bluebird");

function createReduxStore(req, match) { // eslint-disable-line
  initialState.config = {
    defaultLocale,
    derivePath,
    qtumExplorerPath,
    encryptSalt,
    INKcontractAddress,
    refreshTime,
    playMarketDownloadLink,
    newsUrl
  };
  const store = Internalizator.configureIn18n(
    configureStore(initialState),
    defaultLocale
  );

  return Promise.resolve(store);
}


module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }
  const md = new MobileDetect(req.headers["user-agent"]);
  if (md.mobile()) {
    req.path = ROUTE_URLS.MOBILE;
  }

  return app.routesEngine.render(req);
};
