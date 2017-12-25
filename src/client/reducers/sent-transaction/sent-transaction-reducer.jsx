/* eslint-disable max-len,complexity */
// @flow
import type {SentTransactionState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {SendTransactionAction} from "../../actions/sent-transaction-action";

export const sendTransactionState = (store: SentTransactionState = initialState.sendTransactionState,
                                     action: SendTransactionAction): SentTransactionState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...store,
        isModalOpen: true
      };
    case "CLOSE_MODAL":
      return {
        ...store,
        isModalOpen: false
      };
    case "RESET_MODAL":
      return {
        ...store,
        isModalOpen: false,
        tokenType: "",
        toAddress: "",
        amount: 0,
        description: "",
        fee: 0,
        conformationalPassword: "",
        rawUtxos: [],
        areRawUtxosFetching: false,
        isSucceed: false,
        isTransactionIsSending: false,
        step: 0
      };
    case "CONFIRM_CONFIRM_MODAL": {
      return {
        ...store,
        step: 2
      };
    }
    case "CONFIRM_PREPARE_MODAL": {
      return {
        ...store,
        step: 1,
        tokenType: action.tokenType,
        toAddress: action.toAddress,
        amount: action.amount,
        description: action.description,
        fee: action.fee
      };
    }
    case "REQUEST_UTXOs_FETCHING": {
      return {
        ...store,
        areRawUtxosFetching: true
      };
    }
    case "REQUEST_UTXOs_FAIL": {
      return {
        ...store,
        areRawUtxosFetching: true
      };
    }
    case "REQUEST_UTXOs_SUCCESS": {
      return {
        ...store,
        areRawUtxosFetching: false,
        rawUtxos: action.utxos
      };
    }
    case "SENT_TRANSACTION_FAIL": {
      return {
        ...store,
        isTransactionIsSending: true
      };
    }
    case "SENT_TRANSACTION_SUCCESS": {
      return {
        ...store,
        isTransactionIsSending: false
      };
    }
    case "SENT_TRANSACTION_FETCHING": {
      return {
        ...store,
        isTransactionIsSending: true
      };
    }
    case "REQUEST_RECOMMENDED_FEE_FETCHING": {
      return {
        ...store,
        isRecommendedFeeFetching: true
      };
    }
    case "REQUEST_RECOMMENDED_FEE_FAIL": {
      return {
        ...store,
        isRecommendedFeeFetching: true
      };
    }
    case "REQUEST_RECOMMENDED_FEE_SUCCESS": {
      return {
        ...store,
        recommendedFee: action.recommendedFee,
        isRecommendedFeeFetching: true
      };
    }
    default:
      return store;
  }
};

