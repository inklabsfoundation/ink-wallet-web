// @flow
import type {ConfigState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {ReceiveAction} from "../../actions/receive-actions";
import type {ConfigAction} from "../../actions/config-actions";

export const config = (store: ConfigState = initialState.config,
                       action: ConfigAction): ConfigState => {
  switch (action.type) {
    case "SET_EXPLORER_URL_ACTION":
      return {
        ...store,
        qtumExplorerPath: action.url
      };
  }
  return store;
};
