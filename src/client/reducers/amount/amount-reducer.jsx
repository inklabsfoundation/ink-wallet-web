/* eslint-disable complexity */
// @flow
import type {AmountState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {AmountAction} from "../../actions/amount-actions";
import * as _ from "lodash";

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
    // eslint-disable-next-line no-case-declarations
    case "SET_FIRST_TX_REQUEST_MADE_ACTION":
      const state: AmountState = _.cloneDeep(store);
      state[action.currency].isFirstFetchComplete = true;
      return state;
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
