// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import {Transaction} from "qtumcore-lib";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT} from "../types/consts";
import axios from "axios";
import {requestWalletData} from "./amount-actions";
import type {SendTransactionState} from "../initial-state";

export const STEPS = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2
};

const REFRESH_OFFSET = 3000;

type OpenModalAction = {
  type: "OPEN_MODAL",
}

type CloseModalAction = {
  type: "CLOSE_MODAL"
}

type ResetModalAction = {
  type: "RESET_MODAL"
}

type RequestUTXOSuccessAction = {
  type: "REQUEST_UTXOs_SUCCESS",
  utxos: Array<Transaction.UnspentOutput>
}

type RequestUTXOFailAction = {
  type: "REQUEST_UTXOs_FAIL"
}

type RequestUTXOFetchingAction = {
  type: "REQUEST_UTXOs_FETCHING"
}

type SentTransactionSuccessAction = {
  type: "SENT_TRANSACTION_SUCCESS",
}

type SentTransactionFailAction = {
  type: "SENT_TRANSACTION_FAIL"
}

type SentTransactionFetchingAction = {
  type: "SENT_TRANSACTION_FETCHING"
}

type ConfirmPrepareModalAction = {
  type: "CONFIRM_PREPARE_MODAL",
  tokenType: string,
  toAddress: string,
  amount: number,
  description: string,
  fee: number,
}

type ConfirmConfirmModalAction = {
  type: "CONFIRM_CONFIRM_MODAL"
}

type RequestRecommendedFeeFetchingAction = {
  type: "REQUEST_RECOMMENDED_FEE_FETCHING"
}

type RequestRecommendedFeeSuccessAction = {
  type: "REQUEST_RECOMMENDED_FEE_SUCCESS",
  recommendedFee: number
}

type RequestRecommendedFeeFailAction = {
  type: "REQUEST_RECOMMENDED_FEE_FAIL"
}

export type SendTransactionAction = OpenModalAction | CloseModalAction
  | RequestUTXOSuccessAction | RequestUTXOFailAction | RequestUTXOFetchingAction
  | ResetModalAction | ConfirmPrepareModalAction | ConfirmConfirmModalAction
  | SentTransactionSuccessAction | SentTransactionFailAction | SentTransactionFetchingAction
  | RequestRecommendedFeeFetchingAction | RequestRecommendedFeeSuccessAction
  | RequestRecommendedFeeFailAction;

export const openModal = (): OpenModalAction => {
  return {
    type: "OPEN_MODAL"
  };
};

export const closeModal = (): CloseModalAction => {
  return {
    type: "CLOSE_MODAL"
  };
};

export const resetModal = (): ResetModalAction => {
  return {
    type: "RESET_MODAL"
  };
};

// eslint-disable-next-line max-params
export const confirmPrepareModal = (tokenType: string,
                                          toAddress: string,
                                          amount: number,
                                          description: string,
                                          fee: number): ConfirmPrepareModalAction => {
  return {
    type: "CONFIRM_PREPARE_MODAL",
    tokenType,
    toAddress,
    amount,
    description,
    fee
  };
};

export const confirmConfirmModal = (): ConfirmConfirmModalAction => {
  return {
    type: "CONFIRM_CONFIRM_MODAL"
  };
};

export const confirmSuccessModa = (): void => {
};

const sentTransactionSuccess = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(confirmConfirmModal());
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      dispatch(requestWalletData());
    }, REFRESH_OFFSET);
    return {
      type: "SENT_TRANSACTION_SUCCESS"
    };
  };
};


const sentTransactionFail = (): SentTransactionFailAction => {
  return {
    type: "SENT_TRANSACTION_FAIL"
  };
};

const sentTransactionFetching = (): SentTransactionFetchingAction => {
  return {
    type: "SENT_TRANSACTION_FETCHING"
  };
};

export const sentTransaction = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const transactionState: SendTransactionState = getState().sendTransactionState;
    dispatch(sentTransactionFetching());
    const address = getState().loginState.address;
    const transaction: Transaction = new Transaction()
      .from(transactionState.rawUtxos)
      .to(
        transactionState.toAddress,
        transactionState.amount * SATOSHI_COUNT)
      .change(address)
      .addData(transactionState.description)
      .fee(transactionState.fee * SATOSHI_COUNT)
      .sign(getState().loginState.prKey);
    const rawTransaction: string = transaction.serialize(true);
    axios.post(`${getState().config.qtumExplorerPath}/tx/send`, {
      rawtx: rawTransaction
    }).then(() => {
      dispatch(sentTransactionSuccess());
    }).catch((error) => {
      dispatch(sentTransactionFail());
    });
  };
};

// eslint-disable-next-line max-len
const requestUTXOSuccess = (utxos: Array<Transaction.UnspentOutput>): RequestUTXOSuccessAction => {
  return {
    type: "REQUEST_UTXOs_SUCCESS",
    utxos
  };
};


const requestUTXOFail = (): RequestUTXOFailAction => {
  return {
    type: "REQUEST_UTXOs_FAIL"
  };
};

const requestUTXOFetching = (): RequestUTXOFetchingAction => {
  return {
    type: "REQUEST_UTXOs_FETCHING"
  };
};

export const requestUtxos = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestUTXOFetching());
    const address = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/addrs/${address}/utxo`)
      .then((response: $AxiosXHR<Array<Object>>) => {
        const utxos: Array<Transaction.UnspentOutput> = response.data.map((utxo: Object) => {
          return new Transaction.UnspentOutput(utxo);
        });
        dispatch(requestUTXOSuccess(utxos));
      })
      .catch(() => {
        dispatch(requestUTXOFail());
      });
  };
};

const requestRecommendedFeeFail = (): RequestRecommendedFeeFailAction => {
  return {
    type: "REQUEST_RECOMMENDED_FEE_FAIL"
  };
};

const requestRecommendedFeeFetching = (): RequestRecommendedFeeFetchingAction => {
  return {
    type: "REQUEST_RECOMMENDED_FEE_FETCHING"
  };
};

// eslint-disable-next-line max-len
const requestRecommendedFeeSuccess = (recommendedFee: number): RequestRecommendedFeeSuccessAction => {
  return {
    type: "REQUEST_RECOMMENDED_FEE_SUCCESS",
    recommendedFee
  };
};

export const requestRecomendedFee = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestRecommendedFeeFetching());
    axios.get(`${getState().config.qtumExplorerPath}/utils/estimatefee`)
      .then((response: $AxiosXHR<Object>) => {
        // eslint-disable-next-line no-magic-numbers
        dispatch(requestRecommendedFeeSuccess(response.data[2]));
      })
      .catch(() => {
        dispatch(requestRecommendedFeeFail());
      });
  };
};

