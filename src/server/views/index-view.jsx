import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import {initialState} from "../../client/initial-state";
import configureStore from "../../client/configureStore";


const Promise = require("bluebird");

function createReduxStore(req, match) { // eslint-disable-line
  initialState.config = {};
  const store = configureStore(initialState);
  return Promise.resolve(store);
}


module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
