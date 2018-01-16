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
      return {
        ...store,
        isLoggedIn: true,
        seed: action.seed,
        passwordHash: action.passwordHash,
        pubKey: action.pubKey,
        prKey: action.prKey,
        address: action.address
      };
    case "INPUT_PASSWORD_ACTION": {
      return {
        ...store,
        inputPassword: action.password.trim()
      };
    }
    case "FILE_UPLOAD_ACTION": {
      return {
        ...store,
        backupFile: action.backupFile,
        isFileUploaded: true
      };
    }
    case "DATA_ERROR_ACTION": {
      return {
        ...store,
        invalidData: true
      };
    }
    default:
      return store;
  }
};

