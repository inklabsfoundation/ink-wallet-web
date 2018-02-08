// @flow

import {EXPLORER_URL} from "../services/explorer-url-handler";
import {isClientSide} from "../services/is-client-side-helper";

type SetExplorerUrlAction = {
  type: "SET_EXPLORER_URL_ACTION",
  url: string
};

export type ConfigAction = SetExplorerUrlAction;

export const setExplorerUrl = (url: string): SetExplorerUrlAction => {
  if (url && url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  if (isClientSide() && url) {
      localStorage.setItem(EXPLORER_URL, url);
  }
  return {
    type: "SET_EXPLORER_URL_ACTION",
    url
  };
};
