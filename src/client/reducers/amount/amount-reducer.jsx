// @flow
import type {AmountState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {AmountAction} from "../../actions/amount-actions";

export const amountState = (store: AmountState = initialState.amountState,
                            action: AmountAction): AmountState => {
  switch (action.type) {
    case "REQUEST_QTUM_BALANCE_FAIL_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          isAmountFetching: true
        }
      };
    case "REQUEST_QTUM_BALANCE_FETCHING_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          isAmountFetching: true
        }
      };
    case "REQUEST_QTUM_BALANCE_SUCCESS_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          balance: action.balance,
          isAmountFetching: false
        }
      };
    case "REQUEST_INK_BALANCE_FAIL_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          isAmountFetching: true
        }
      };
    case "REQUEST_INK_BALANCE_FETCHING_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          isAmountFetching: true
        }
      };
    case "REQUEST_INK_BALANCE_SUCCESS_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          balance: action.balance,
          isAmountFetching: false
        }
      };
    case "REQUEST_QTUM_TRANSACTIONS_FAIL_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          areTxsFetching: true
        }
      };
    case "REQUEST_QTUM_TRANSACTIONS_FETCHING_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          areTxsFetching: true
        }
      };
    case "REQUEST_QTUM_TRANSACTIONS_SUCCESS_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          txs: action.txs,
          areTxsFetching: false
        }
      };
    case "REQUEST_INK_TRANSACTIONS_FAIL_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          areTxsFetching: true
        }
      };
    case "REQUEST_INK_TRANSACTIONS_FETCHING_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          areTxsFetching: true
        }
      };
    case "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          txs: action.txs,
          areTxsFetching: false
        }
      };
    default:
      return store;
  }
};
