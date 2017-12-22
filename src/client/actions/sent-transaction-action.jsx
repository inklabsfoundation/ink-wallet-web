// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import {Transaction} from "qtumcore-lib";
import {SHA256} from "crypto-js";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT} from "../types/consts";
import axios from "axios";
import {requestQtumBalance, requestQtumTransactions} from "./amount-actions";

export const STEPS = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2
};

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
  type: "CONFIRM_PREPARE_MODAL"
}

type ConfirmConfirmModalAction = {
  type: "CONFIRM_CONFIRM_MODAL"
}

export type SendTransactionAction = OpenModalAction | CloseModalAction
  | RequestUTXOSuccessAction | RequestUTXOFailAction | RequestUTXOFetchingAction
  | ResetModalAction | ConfirmPrepareModalAction | ConfirmConfirmModalAction
  | SentTransactionSuccessAction | SentTransactionFailAction | SentTransactionFetchingAction;


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

export const confirmPrepareModalAction = (): ConfirmPrepareModalAction => {
  return {
    type: "CONFIRM_PREPARE_MODAL"
  };
};

export const confirmConfirmModalAction = (): ConfirmConfirmModalAction => {
  return {
    type: "CONFIRM_CONFIRM_MODAL"
  };
};

export const confirmSuccessModalAction = (): void => {
};

const sentTransactionSuccess = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(requestQtumBalance());
    dispatch(requestQtumTransactions());
    setTimeout(()=> {
      dispatch(requestQtumBalance());
      dispatch(requestQtumTransactions());
    }, 2000);
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

export const sentTransaction = (toAddress: string, value: number, data: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(sentTransactionFetching());
    const address = getState().loginState.address;
    const transaction: Transaction = new Transaction()
      .from(getState().sendTransactionState.rawUtxos)
      .to(toAddress, value * SATOSHI_COUNT)
      .change(address)
      .addData(data)
      .fee(0.005 * SATOSHI_COUNT)
      .sign(getState().loginState.prKey);
    const rawTransaction: string = transaction.serialize(true);
    axios.post(`${getState().config.qtumExplorerPath}/tx/send`, {
      rawtx: rawTransaction
    }).then(() => {
      dispatch(sentTransactionSuccess());
      dispatch(resetModal());
      dispatch(closeModal());
    }).catch((error) => {
      dispatch(sentTransactionFail());
      console.log(error.data);
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


