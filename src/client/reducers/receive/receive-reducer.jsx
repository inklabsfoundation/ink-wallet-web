/* eslint-disable max-len,complexity */
// @flow
import type {ReceiveState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {ReceiveAction} from "../../actions/receive-actions";

export const receiveState = (store: ReceiveState = initialState.receiveState,
                                     action: ReceiveAction): ReceiveState => {
  switch (action.type) {
    case "OPEN_RECEIVE_MODAL":
      return {
        ...store,
        isModalOpen: true
      };
    case "CLOSE_RECEIVE_MODAL":
      return {
        ...store,
        isModalOpen: false
      };
    default:
      return store;
  }
};
