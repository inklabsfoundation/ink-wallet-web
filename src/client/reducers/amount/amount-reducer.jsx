/* eslint-disable complexity */
// @flow
import type {AmountState} from "../../initial-state";
import {initialState, SUPPORTED_CURRENCIES} from "../../initial-state";
import type {TokenDesc} from "../../initial-state";
import type {AmountAction} from "../../actions/amount-actions";
import * as _ from "lodash";

export const qtumTxComparator = (left: Object, right: Object): number => {
  if (left.time < right.time) {
    return -1;
  } else if (left.time > right.time) {
    return 1;
  } else if (left.txid < right.txid) {
    return -1;
  } else if (left.txid > right.txid) {
    return 1;
  } else {
    return 0;
  }
};

export const tokenTxComparator = (left: Object, right: Object): number => {
  if (left.block_height < right.block_height) {
    return -1;
  } else if (left.block_height > right.block_height) {
    return 1;
  } else if (left.tx_hash < right.tx_hash) {
    return -1;
  } else if (left.tx_hash > right.tx_hash) {
    return 1;
  } else {
    return 0;
  }
};

// eslint-disable-next-line max-params
const mergeAndSortTxs = (oldTxs: Array<Object>, newTxs: Array<Object>, unionField: string, currency: string): Array<Object> => {
  let txs: Array<Object> = (_.cloneDeep(oldTxs)).concat(newTxs);
  txs.forEach((tx: Object, inx: number) => {
    const updatedOneTx: ?Object = newTxs.find((newOneTx: Object): boolean => tx[unionField] === newOneTx[unionField]);
    if (updatedOneTx) {
      txs[inx] = updatedOneTx;
    }
  });
  txs = (_.unionBy(txs, unionField)).sort(currency === SUPPORTED_CURRENCIES.QTUM ? qtumTxComparator : tokenTxComparator);

  return txs.reverse();
};

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
    case "SET_INK_TOKEN_PENDING_DATA":
      return {
        ...store,
        INK: {
          ...store.INK,
          isTokenTxPending: action.isTokenTxPending,
          pendingTxs: action.pendingTxs
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
          txs: mergeAndSortTxs(store.QTUM.txs, action.txs, "txid", SUPPORTED_CURRENCIES.QTUM),
          totalItems: action.totalItems,
          areTxsFetching: false
        }
      };
    case "REQUEST_HISTORY_QTUM_TRANSACTIONS_SUCCESS_ACTION":
      return {
        ...store,
        QTUM: {
          ...store.QTUM,
          txs: mergeAndSortTxs(store.QTUM.txs, action.txs, "txid", SUPPORTED_CURRENCIES.QTUM)
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
    case "REQUEST_TOKEN_DESC_SUCCESS_ACTION": {
      const tokenDescs: Array<TokenDesc> = _.cloneDeep(store.INK.tokenDescs);
      tokenDescs.push({
        txId: action.data.txId,
        desc: action.data.desc
      });
      return {
        ...store,
        INK: {
          ...store.INK,
          tokenDescs
        }
      };
    }
    case "REQUEST_HISTORY_INK_TRANSACTIONS_SUCCESS_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          txs: mergeAndSortTxs(store.INK.txs, action.txs, "tx_hash", SUPPORTED_CURRENCIES.INK)
        }
      };
    case "REQUEST_INK_TRANSACTIONS_SUCCESS_ACTION":
      return {
        ...store,
        INK: {
          ...store.INK,
          txs: mergeAndSortTxs(store.INK.txs, action.txs, "tx_hash", SUPPORTED_CURRENCIES.INK),
          totalItems: action.totalItems,
          areTxsFetching: false
        }
      };
    default:
      return store;
  }
};
