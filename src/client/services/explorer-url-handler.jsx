// @flow
import type {State} from "../initial-state";
import * as _ from "lodash";
import type {Action, Dispatch} from "../types/redux";
import type {Store} from "redux";
import {dontShowModal} from "../actions/login-actions";
import {setExplorerUrl} from "../actions/config-actions";

export const EXPLORER_URL = "explorerUrl";

export const handleExplorerUrl = (store: Store<State, Action, Dispatch>): Store<State, Action, Dispatch> => {
  if (typeof window !== "undefined") {
    const explorerUrl: ?string = localStorage.getItem(EXPLORER_URL);
    if (explorerUrl) {
      store.dispatch(setExplorerUrl(localStorage.getItem(EXPLORER_URL)));
    }
  }

  return store;
};
