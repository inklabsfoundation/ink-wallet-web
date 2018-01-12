/* eslint-disable no-use-before-define */
// @flow

import type {State} from "../initial-state";
import type {CreateWalletAction} from "../actions/creation-actions";
import type {AuthAction} from "../actions/login-actions";
import type {AmountAction} from "../actions/amount-actions";
import type {SendTransactionAction} from "../actions/sent-transaction-action";
import type {ReceiveAction} from "../actions/receive-actions";

export type Action = CreateWalletAction | AuthAction |
  AmountAction | SendTransactionAction | ReceiveAction;
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | Array<Action>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
