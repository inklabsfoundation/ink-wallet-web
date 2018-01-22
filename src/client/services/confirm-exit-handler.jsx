// @flow
import type {State} from "../initial-state";
import * as _ from "lodash";
import type {Action, Dispatch} from "../types/redux";
import type {Store} from "redux";
import {dontShowModal} from "../actions/login-actions";

export const EXIT_MODAL_SHOW_KEY = "isExitModalShow";

export const handleConfirmExitShowness = (store: Store<State, Action, Dispatch>): Store<State, Action, Dispatch> => {
  if (typeof window !== "undefined") {
    if (!_.isUndefined(localStorage.getItem(EXIT_MODAL_SHOW_KEY))
        &&  localStorage.getItem(EXIT_MODAL_SHOW_KEY) === "false") {
        store.dispatch(dontShowModal());
    }
  }
  return store;
};
