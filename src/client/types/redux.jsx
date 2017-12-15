/* eslint-disable no-use-before-define */
// @flow

import type {State} from "../initial-state";
import type {CreateWalletAction} from "../actions/creation-actions";

export type Action = CreateWalletAction;
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | Array<Action>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
