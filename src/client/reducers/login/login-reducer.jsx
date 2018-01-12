/* eslint-disable complexity */
// @flow
import type {LoginState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {AuthAction} from "../../actions/login-actions";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";

export const loginState = (store: LoginState = initialState.loginState, action: AuthAction): LoginState => {
  switch (action.type) {
    case "LOGIN_ACTION":
      if (typeof window !== "undefined") {
        browserHistory.push(ROUTE_URLS.MAIN_PAGE);
      }
      return {
        ...store,
        isLoggedIn: true,
        seed: action.seed,
        passwordHash: action.passwordHash,
        pubKey: action.pubKey,
        prKey: action.prKey,
        address: action.address
      };
    case "LOGOUT_ACTION":
      if (typeof window !== "undefined") {
        browserHistory.push(ROUTE_URLS.HOME_PAGE);
      }
      return {
        ...store,
        isLoggedIn: false,
        seed: null,
        passwordHash: "",
        pubKey: {},
        prKey: {},
        address: {}
      };
    default:
      return store;
  }
};

