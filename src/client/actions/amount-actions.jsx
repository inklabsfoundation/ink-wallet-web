/* eslint-disable no-magic-numbers */
// @flow

import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import axios from "axios";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT, TOKENS_COUNT} from "../types/consts";
import {openRequestFailModal, requestBlockHeight, setLastTransactionTimeStamp} from "./login-actions";
import * as _ from "lodash";
import {SUPPORTED_CURRENCIES} from "../initial-state";

type RequestQtumBalanceFetchingAction = {
  type: "REQUEST_QTUM_BALANCE_FETCHING_ACTION"
};

type RequestQtumBalanceSuccessAction = {
  type: "REQUEST_QTUM_BALANCE_SUCCESS_ACTION",
  balance: number
};

type RequestQtumBalanceFailAction = {
  type: "REQUEST_QTUM_BALANCE_FAIL_ACTION"
};

type RequestQtumTransactionsFetchingAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_FETCHING_ACTION"
};

type RequestQtumTransactionsSuccessAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION",
  txs: Array<Object>
};

type RequestQtumTransactionsFailAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_FAIL_ACTION"
};

type RequestInkTransactionsFetchingAction = {
  type: "REQUEST_INK_TRANSACTIONS_FETCHING_ACTION"
};

type RequestInkTransactionsSuccessAction = {
  type: "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION",
  txs: Array<Object>
};

type RequestInkTransactionsFailAction = {
  type: "REQUEST_INK_TRANSACTIONS_FAIL_ACTION"
};

type RequestInkBalanceFetchingAction = {
  type: "REQUEST_INK_BALANCE_FETCHING_ACTION"
};

type RequestinkBalanceSuccessAction = {
  type: "REQUEST_INK_BALANCE_SUCCESS_ACTION",
  balance: number
};

type RequestInkBalanceFailAction = {
  type: "REQUEST_INK_BALANCE_FAIL_ACTION"
};

type SetFirstTxRequestMadeAction = {
  type: "SET_FIRST_TX_REQUEST_MADE_ACTION",
  currency: string
};

export type AmountAction = RequestQtumBalanceFetchingAction |
  RequestQtumBalanceSuccessAction | RequestQtumBalanceFailAction |
  RequestQtumTransactionsFetchingAction | RequestQtumTransactionsSuccessAction |
  RequestQtumTransactionsFailAction | RequestInkTransactionsFetchingAction |
  RequestInkTransactionsSuccessAction | RequestInkTransactionsFailAction |
  RequestInkBalanceFetchingAction | RequestinkBalanceSuccessAction |
  RequestInkBalanceFailAction | SetFirstTxRequestMadeAction;

const requestInkBalanceFetching = (): RequestInkBalanceFetchingAction => {
  return {
    type: "REQUEST_INK_BALANCE_FETCHING_ACTION"
  };
};

const requestInkBalanceError = (): RequestInkBalanceFailAction => {
  return {
    type: "REQUEST_INK_BALANCE_FAIL_ACTION"
  };
};

const setFirstTxRequestMadeAction = (currency: string): SetFirstTxRequestMadeAction => {
  return {
    type: "SET_FIRST_TX_REQUEST_MADE_ACTION",
    currency
  };
};

const requestInkFetchingSuccess = (balance: number): RequestinkBalanceSuccessAction => {
  return {
    type: "REQUEST_INK_BALANCE_SUCCESS_ACTION",
    balance
  };
};

export const requestInkBalance = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestInkBalanceFetching());
    const address: string = getState().loginState.address.toString();
    const tokenAddress: string = getState().config.INKcontractAddress;
    const path: string = getState().config.qtumExplorerPath;
    axios.get(`${path}/tokens/${tokenAddress}/addresses/${address}/balance?format=object`)
      .then((response: $AxiosXHR<any>) => {
        let amount: number = 0;
        if (typeof response.data !== "string") {
          amount = response.data.balance / TOKENS_COUNT;
        }
        dispatch(requestInkFetchingSuccess(amount));
      }, (error: Object) => {
        if (error.response && error.response.status !== 404) {
          dispatch(openRequestFailModal());
        }
        dispatch(requestInkBalanceError());
      });
  };
};

const requestQtumBalanceFetching = (): RequestQtumBalanceFetchingAction => {
  return {
    type: "REQUEST_QTUM_BALANCE_FETCHING_ACTION"
  };
};

const requestQtumBalanceError = (): RequestQtumBalanceFailAction => {
  return {
    type: "REQUEST_QTUM_BALANCE_FAIL_ACTION"
  };
};

const requestQtumFetchingSuccess = (balance: number): RequestQtumBalanceSuccessAction => {
  return {
    type: "REQUEST_QTUM_BALANCE_SUCCESS_ACTION",
    balance
  };
};

export const requestQtumBalance = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumBalanceFetching());
    const address = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/addr/${address}/balance`)
      .then((response: $AxiosXHR<number>) => {
        const amount: number = response.data;
        dispatch(requestQtumFetchingSuccess(amount / SATOSHI_COUNT));
      }, () => {
        dispatch(openRequestFailModal());
        dispatch(requestQtumBalanceError());
      });
  };
};

const requestQtumTransactionsError = (): RequestQtumTransactionsFailAction => {
  return {
    type: "REQUEST_QTUM_TRANSACTIONS_FAIL_ACTION"
  };
};

const requestQtumTransactionsFetching = (): RequestQtumTransactionsFetchingAction => {
  return {
    type: "REQUEST_QTUM_TRANSACTIONS_FETCHING_ACTION"
  };
};

// eslint-disable-next-line max-len
const requestQtumTransactionsSuccess = (txs: Array<Object>): RequestQtumTransactionsSuccessAction => {
  return {
    type: "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION",
    txs
  };
};

export const requestQtumTransactions = (isFirstRequest: ?boolean): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumTransactionsFetching());
    const address = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/addrs/${address}/txs?from=0&to=50`)
      .then((response: $AxiosXHR<Object>) => {
        const txs: Array<Object> = response.data.items;
        if (isFirstRequest && txs.length > 0) {
          const lastTransTime: Object = _.maxBy(txs, (tx: Object): number => {
            return tx.time;
          });
          dispatch(setLastTransactionTimeStamp(lastTransTime.time));
          dispatch(setFirstTxRequestMadeAction(SUPPORTED_CURRENCIES.QTUM));
        }
        dispatch(requestQtumTransactionsSuccess(txs));
      }, () => {
        dispatch(openRequestFailModal());
        dispatch(requestQtumTransactionsError());
        dispatch(setFirstTxRequestMadeAction(SUPPORTED_CURRENCIES.QTUM));
      });
  };
};

const requestInkTransactionsError = (): RequestInkTransactionsFailAction => {
  return {
    type: "REQUEST_INK_TRANSACTIONS_FAIL_ACTION"
  };
};

const requestInkTransactionsFetching = (): RequestInkTransactionsFetchingAction => {
  return {
    type: "REQUEST_INK_TRANSACTIONS_FETCHING_ACTION"
  };
};

// eslint-disable-next-line max-len
const requestInkTransactionsSuccess = (txs: Array<Object>): RequestInkTransactionsSuccessAction => {
  return {
    type: "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION",
    txs
  };
};

export const requestInkTransactions = (isFirstRequest: ?boolean): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestInkTransactionsFetching());
    const address: string = getState().loginState.address.toString();
    const tokenAddress: string = getState().config.INKcontractAddress;
    const path: string = getState().config.qtumExplorerPath;
    axios.get(`${path}/tokens/${tokenAddress}/transactions?addresses[]=${address}`)
      .then((response: $AxiosXHR<Object>) => {
        const txs: Array<Object> = response.data.items;
        if (isFirstRequest && txs.length > 0) {
          const lastTransTime: Object = _.maxBy(txs, (tx: Object): number => {
            return Date.parse(tx.block_date_time) / 1000;
          });
          dispatch(setLastTransactionTimeStamp(Date.parse(lastTransTime.block_date_time) / 1000));
          dispatch(setFirstTxRequestMadeAction(SUPPORTED_CURRENCIES.INK));
        }
        dispatch(requestInkTransactionsSuccess(txs));
      }, () => {
        dispatch(openRequestFailModal());
        dispatch(requestInkTransactionsError());
        dispatch(setFirstTxRequestMadeAction(SUPPORTED_CURRENCIES.INK));
      });
  };
};

export const requestWalletData = (isFirstRequest: ?boolean): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(requestQtumBalance());
    dispatch(requestQtumTransactions(isFirstRequest));
    dispatch(requestInkBalance());
    dispatch(requestBlockHeight());
    dispatch(requestInkTransactions(isFirstRequest));
  };
};
