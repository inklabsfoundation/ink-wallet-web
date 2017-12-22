import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import {initialState} from "../../client/initial-state";
import configureStore from "../../client/configureStore";
import Internalizator from "../../client/services/internalizator";
import {config} from "electrode-confippet";

const defaultLocale = config.$("settings.defaultLocale");
const derivePath = config.$("settings.derivePath");
const qtumExplorerPath = config.$("settings.qtumExplorerPath");
const encryptSolt = config.$("settings.encryptSolt");


const Promise = require("bluebird");

function createReduxStore(req, match) { // eslint-disable-line
  initialState.config = {
    defaultLocale,
    derivePath,
    qtumExplorerPath,
    encryptSolt
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

  return app.routesEngine.render(req);
};
