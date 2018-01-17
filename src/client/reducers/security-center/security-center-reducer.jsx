/* eslint-disable complexity */
// @flow
import type {SecurityCenterState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {SecurityCenterAction} from "../../actions/security-center-actions";

export const securityCenterState = (store: SecurityCenterState = initialState.securityCenterState,
                             action: SecurityCenterAction): SecurityCenterState => {
  switch (action.type) {
    case "OPEN_ERROR_MODAL":
      return {
        ...store,
        isErrorModalOpen: true
      };
    case "CLOSE_ERROR_MODAL":
      return {
        ...store,
        isErrorModalOpen: false
      };
    case "CLOSE_MNEMONICS_MODAL":
      return {
        ...store,
        isMnemonicModalOpen: false
      };
    case "OPEN_MNEMONICS_MODAL":
      return {
        ...store,
        isMnemonicModalOpen: true
      };
    case "SET_PASSWORD_SECURITY_ACTION":
      return {
        ...store,
        inputPassword: action.password
      };
    default:
      return store;
  }
};

