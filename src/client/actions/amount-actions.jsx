// @flow

import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import axios from "axios";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT} from "../types/consts";

type RequestQtumBalanceFetchingAction = {
  type: "REQUEST_QTUM_BALANCE_FETCHING_ACTION"
}

type RequestQtumBalanceSuccessAction = {
  type: "REQUEST_QTUM_BALANCE_SUCCESS_ACTION",
  balance: number
}

type RequestQtumBalanceFailAction = {
  type: "REQUEST_QTUM_BALANCE_FAIL_ACTION"
}

type RequestQtumTransactionsFetchingAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_FETCHING_ACTION"
}

type RequestQtumTransactionsSuccessAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION",
  txs: Array<Object>
}

type RequestQtumTransactionsFailAction = {
  type: "REQUEST_QTUM_TRANSACTIONS_FAIL_ACTION"
}

export type AmountAction = RequestQtumBalanceFetchingAction |
  RequestQtumBalanceSuccessAction | RequestQtumBalanceFailAction |
  RequestQtumTransactionsFetchingAction | RequestQtumTransactionsSuccessAction |
  RequestQtumTransactionsFailAction;

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

// eslint-disable-next-line max-len
const requestQtumTransactionsSuccess = (txs: Array<Object>): RequestQtumTransactionsSuccessAction => {
  return {
    type: "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION",
    txs
  };
};

export const requestQtumTransactions = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestQtumBalanceFetching());
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
