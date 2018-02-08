/* eslint-disable no-magic-numbers */
// @flow

import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import axios from "axios";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT, TOKENS_COUNT} from "../types/consts";
import {openRequestFailModal, requestBlockHeight, setLastTransactionTimeStamp} from "./login-actions";
import * as _ from "lodash";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import {findDescriptionInTx} from "../services/transaction-mapper";
import type {TokenDesc} from "../initial-state";

const QTUM_PAGE_COUNT = 50;
const INK_PAGE_COUNT = 100;

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
  txs: Array<Object>,
  totalItems: number
};

type RequestQtumTransactionsFailAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_FAIL_ACTION"
};

type RequestInkTransactionsFetchingAction = {
  type: "REQUEST_INK_TRANSACTIONS_FETCHING_ACTION"
};

type RequestInkTransactionsSuccessAction = {
  type: "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION",
  txs: Array<Object>,
  totalItems: number
};

type RequestQtumHistoryTransactionsSuccessAction = {
  type: "REQUEST_HISTORY_QTUM_TRANSACTIONS_SUCCESS_ACTION",
  txs: Array<Object>
};

type RequestInkHistoryTransactionsSuccessAction = {
  type: "REQUEST_HISTORY_INK_TRANSACTIONS_SUCCESS_ACTION",
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

type RequestTokenDescSuccessAction = {
  type: "REQUEST_TOKEN_DESC_SUCCESS_ACTION",
  token: string,
  data: TokenDesc
};

export type AmountAction = RequestQtumBalanceFetchingAction |
  RequestQtumBalanceSuccessAction | RequestQtumBalanceFailAction |
  RequestQtumTransactionsFetchingAction | RequestQtumTransactionsSuccessAction |
  RequestQtumTransactionsFailAction | RequestInkTransactionsFetchingAction |
  RequestInkTransactionsSuccessAction | RequestInkTransactionsFailAction |
  RequestInkBalanceFetchingAction | RequestinkBalanceSuccessAction |
  RequestInkBalanceFailAction | SetFirstTxRequestMadeAction |
  RequestTokenDescSuccessAction | RequestQtumHistoryTransactionsSuccessAction |
  RequestInkHistoryTransactionsSuccessAction;

const requestQtumHistoryTransactionsSuccess = (txs: Array<Object>): RequestQtumHistoryTransactionsSuccessAction => {
  return {
    type: "REQUEST_HISTORY_QTUM_TRANSACTIONS_SUCCESS_ACTION",
    txs
  };
};

const requestInkHistoryTransactionsSuccess = (txs: Array<Object>): RequestInkHistoryTransactionsSuccessAction => {
  return {
    type: "REQUEST_HISTORY_INK_TRANSACTIONS_SUCCESS_ACTION",
    txs
  };
};

export const requestQtumHistoryTransactions = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const totalItems = getState().amountState.QTUM.totalItems;
    if (totalItems > QTUM_PAGE_COUNT) {
      const address: string = getState().loginState.address.toString();
      const requestCount: number = Math.floor((totalItems - 1) / QTUM_PAGE_COUNT);
      for (let i = 1; i <= requestCount; i++) {
        axios.get(`${getState().config.qtumExplorerPath}/addrs/${address}/txs?from=${QTUM_PAGE_COUNT * i }&to=${QTUM_PAGE_COUNT * (i + 1)}`)
          .then((response: $AxiosXHR<Object>) => {
            const txs: Array<Object> = response.data.items;
            dispatch(requestQtumHistoryTransactionsSuccess(txs));
          }, () => {
            dispatch(openRequestFailModal());
          });
      }
    }
  };
};

export const requestInkHistoryTransactions = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const totalItems = getState().amountState.INK.totalItems;
    if (totalItems > INK_PAGE_COUNT) {
      const address: string = getState().loginState.address.toString();
      const requestCount: number = Math.floor((totalItems - 1) / INK_PAGE_COUNT);
      const tokenAddress: string = getState().config.INKcontractAddress;
      const path: string = getState().config.qtumExplorerPath;
      axios.get(`${path}/tokens/${tokenAddress}/transactions?addresses[]=${address}`);
      for (let i = 1; i <= requestCount; i++) {
        axios.get(`${path}/tokens/${tokenAddress}/transactions?addresses[]=${address}&offset=${INK_PAGE_COUNT * i }`)
          .then((response: $AxiosXHR<Object>) => {
            const txs: Array<Object> = response.data.items;
            dispatch(requestInkHistoryTransactionsSuccess(txs));
          }, () => {
            dispatch(openRequestFailModal());
          });
      }
    }
  };
};

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
    const address: string = getState().loginState.address.toString();
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
const requestQtumTransactionsSuccess = (txs: Array<Object>, totalItems: number): RequestQtumTransactionsSuccessAction => {
  return {
    type: "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION",
    txs,
    totalItems
  };
};

const requestTokensDescSuccess = (token: string, txId: string, desc: string): RequestTokenDescSuccessAction => {
  return {
    type: "REQUEST_TOKEN_DESC_SUCCESS_ACTION",
    token,
    data: {
      txId,
      desc
    }
  };
};

export const requestTokensDesc = (txId: string, tokenName: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumTransactionsFetching());
    axios.get(`${getState().config.qtumExplorerPath}/tx/${txId}`)
      .then((response: $AxiosXHR<Object>) => {
        const descr: string = findDescriptionInTx(response.data);
        dispatch(requestTokensDescSuccess(tokenName, txId, descr));
      }, () => {
        dispatch(openRequestFailModal());
      });
  };
};

export const requestQtumTransactions = (isFirstRequest: ?boolean): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumTransactionsFetching());
    const address: string = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/addrs/${address}/txs?from=0&to=${QTUM_PAGE_COUNT}`)
      .then((response: $AxiosXHR<Object>) => {
        const txs: Array<Object> = response.data.items;
        if (isFirstRequest && txs.length > 0) {
          const lastTransTime: Object = _.maxBy(txs, (tx: Object): number => {
            return tx.time;
          });
          dispatch(setLastTransactionTimeStamp(lastTransTime.time));
          dispatch(setFirstTxRequestMadeAction(SUPPORTED_CURRENCIES.QTUM));
        }
        dispatch(requestQtumTransactionsSuccess(txs, response.data.totalItems));
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
const requestInkTransactionsSuccess = (txs: Array<Object>, totalItems: number): RequestInkTransactionsSuccessAction => {
  return {
    type: "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION",
    txs,
    totalItems
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
        dispatch(requestInkTransactionsSuccess(txs, response.data.count));
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

export const requestHistoryTxsData = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(requestQtumHistoryTransactions());
    dispatch(requestInkHistoryTransactions());
  };
};
