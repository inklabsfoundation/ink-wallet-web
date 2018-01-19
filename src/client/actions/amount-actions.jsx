// @flow

import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import axios from "axios";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT, TOKENS_COUNT} from "../types/consts";

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

export type AmountAction = RequestQtumBalanceFetchingAction |
  RequestQtumBalanceSuccessAction | RequestQtumBalanceFailAction |
  RequestQtumTransactionsFetchingAction | RequestQtumTransactionsSuccessAction |
  RequestQtumTransactionsFailAction | RequestInkTransactionsFetchingAction |
  RequestInkTransactionsSuccessAction | RequestInkTransactionsFailAction |
  RequestInkBalanceFetchingAction | RequestinkBalanceSuccessAction |
  RequestInkBalanceFailAction;

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
      })
      .catch(() => {
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
      })
      .catch(() => {
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

export const requestQtumTransactions = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumTransactionsFetching());
    const address = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/txs?address=${address}&pageNum=0`)
      .then((response: $AxiosXHR<Object>) => {
        const txs: Array<Object> = response.data.txs;
        dispatch(requestQtumTransactionsSuccess(txs));
      })
      .catch(() => {
        dispatch(requestQtumTransactionsError());
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

export const requestInkTransactions = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestInkTransactionsFetching());
    const address: string = getState().loginState.address.toString();
    const tokenAddress: string = getState().config.INKcontractAddress;
    const path: string = getState().config.qtumExplorerPath;
    axios.get(`${path}/tokens/${tokenAddress}/transactions?addresses[]=${address}`)
      .then((response: $AxiosXHR<Object>) => {
        const txs: Array<Object> = response.data.items;
        dispatch(requestInkTransactionsSuccess(txs));
      })
      .catch(() => {
        dispatch(requestInkTransactionsError());
      });
  };
};

export const requestWalletData = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(requestQtumBalance());
    dispatch(requestQtumTransactions());
    dispatch(requestInkBalance());
    dispatch(requestInkTransactions());
  };
};
