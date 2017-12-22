// @flow
import type {ConfigState} from "../../initial-state";
import {initialState} from "../../initial-state";

export const config = (store: ConfigState = initialState.config): ConfigState => {
  return store;
};
