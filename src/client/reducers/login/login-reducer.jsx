/* eslint-disable complexity */
// @flow
import type {LoginState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {AuthAction} from "../../actions/login-actions";

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
        address: action.address,
        mnemonic: action.mnemonic
      };
    case "DONT_SHOW_EXIT_MODAL_ACTION": {
      return {
        ...store,
        dontShowConfirmExit: true
      };
    }
    case "SHOW_EXIT_MODAL_ACTION": {
      return {
        ...store,
        dontShowConfirmExit: false
      };
    }
    case "OPEN_REQUEST_FAIL_MODAL_ACTION": {
      return {
        ...store,
        isRequestFailModalOpen: true
      };
    }
    case "CLOSE_REQUEST_FAIL_MODAL_ACTION": {
      return {
        ...store,
        isRequestFailModalOpen: false
      };
    }
    case "OPEN_NEW_TRANSACTIONS_MODAL_ACTION": {
      return {
        ...store,
        isNewTransactionsModalOpen: true
      };
    }
    case "CLOSE_NEW_TRANSACTIONS_MODAL_ACTION": {
      return {
        ...store,
        isNewTransactionsModalOpen: false
      };
    }
    case "SET_LAST_TRASACTION_TIME_STAMP_ACTION": {
      return {
        ...store,
        lastTransactionTimeStamp: action.timestamp > store.lastTransactionTimeStamp ? action.timestamp : store.lastTransactionTimeStamp
      };
    }
    case "OPEN_EXIT_MODAL_ACTION": {
      return {
        ...store,
        isExitModalOpen: true
      };
    }
    case "CLOSE_EXIT_MODAL_ACTION": {
      return {
        ...store,
        isExitModalOpen: false,
        isExit: false
      };
    }
    case "SET_EXIT_ACTION": {
      return {
        ...store,
        isExit: true
      };
    }
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

