/* eslint-disable complexity */
// @flow
import type {SendTransactionState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {SendTransactionAction} from "../../actions/sent-transaction-action";

const PREPARE_STEP: number = 0;
const CONFIRM_STEP: number = 1;
const RESULT_STEP: number = 2;

export const sendTransactionState = (store: SendTransactionState = initialState.sendTransactionState,
                                     action: SendTransactionAction): SendTransactionState => {
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
        step: PREPARE_STEP,
        transactionSendFail: false
      };
    case "CONFIRM_CONFIRM_MODAL": {
      return {
        ...store,
        step: RESULT_STEP
      };
    }
    case "CONFIRM_PREPARE_MODAL": {
      return {
        ...store,
        step: CONFIRM_STEP,
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
    case "SET_STAKING_BALANCE": {
      return {
        ...store,
        stakingBalance: action.stakingBalance
      };
    }
    case "SENT_TRANSACTION_FAIL": {
      return {
        ...store,
        transactionSendFail: true
      };
    }
    case "SET_AVAILABLE_AMOUNT": {
      return {
        ...store,
        availableAmount: action.amount
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

