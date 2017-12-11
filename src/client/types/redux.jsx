// @flow

import type {State} from "../initial-state";

export type Action = {};
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | Array<Action>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
