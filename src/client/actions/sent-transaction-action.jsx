// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import qtumcore, {Transaction, Address} from "@evercode-lab/qtumcore-lib";
import type {$AxiosXHR} from "axios";
import {SATOSHI_COUNT} from "../types/consts";
import axios from "axios";
import {requestWalletData, setInkTokenPendingDataAction} from "./amount-actions";
import type {SendTransactionState} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import CryptoHandler from "../services/crypto-handler";
import * as _ from "lodash";
import {openRequestFailModalForce} from "./login-actions";

export const STEPS = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2
};

const UTXO_STAKING_CONFIRMATIONS_LOCK = 501;

const REFRESH_OFFSET = 3000;

const FEE_INCREASE_COEF = 0.3;

type OpenModalAction = {
  type: "OPEN_MODAL"
};

type CloseModalAction = {
  type: "CLOSE_MODAL"
};

type ResetModalAction = {
  type: "RESET_MODAL"
};

type RequestUTXOSuccessAction = {
  type: "REQUEST_UTXOs_SUCCESS",
  utxos: Array<Transaction.UnspentOutput>
};

type RequestUTXOFailAction = {
  type: "REQUEST_UTXOs_FAIL"
};

type RequestUTXOFetchingAction = {
  type: "REQUEST_UTXOs_FETCHING"
};

type SetStakingBalanceAction = {
  type: "SET_STAKING_BALANCE",
  stakingBalance: number
};

type SentTransactionSuccessAction = {
  type: "SENT_TRANSACTION_SUCCESS"
};

type SentTransactionFailAction = {
  type: "SENT_TRANSACTION_FAIL"
};

type SentTransactionFetchingAction = {
  type: "SENT_TRANSACTION_FETCHING"
};

type SetAvailableAmountAction = {
  type: "SET_AVAILABLE_AMOUNT",
  amount: number
};

type ConfirmPrepareModalAction = {
  type: "CONFIRM_PREPARE_MODAL",
  tokenType: string,
  toAddress: string,
  amount: number,
  description: string,
  fee: number
};

type ConfirmConfirmModalAction = {
  type: "CONFIRM_CONFIRM_MODAL"
};

type RequestRecommendedFeeFetchingAction = {
  type: "REQUEST_RECOMMENDED_FEE_FETCHING"
};

type RequestRecommendedFeeSuccessAction = {
  type: "REQUEST_RECOMMENDED_FEE_SUCCESS",
  recommendedFee: number
};

type RequestRecommendedFeeFailAction = {
  type: "REQUEST_RECOMMENDED_FEE_FAIL"
};

export type SendTransactionAction = OpenModalAction | CloseModalAction
  | RequestUTXOSuccessAction | RequestUTXOFailAction | RequestUTXOFetchingAction
  | ResetModalAction | ConfirmPrepareModalAction | ConfirmConfirmModalAction
  | SentTransactionSuccessAction | SentTransactionFailAction | SentTransactionFetchingAction
  | RequestRecommendedFeeFetchingAction | RequestRecommendedFeeSuccessAction
  | RequestRecommendedFeeFailAction | SetStakingBalanceAction | SetAvailableAmountAction;

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

const setAvailableAmount = (amount: number): SetAvailableAmountAction => {
  return {
    type: "SET_AVAILABLE_AMOUNT",
    amount
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

const sentTransactionSuccess = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(confirmConfirmModal());
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      dispatch(requestWalletData());
    }, REFRESH_OFFSET);
    dispatch({type: "SENT_TRANSACTION_SUCCESS"});
  };
};


const sentTransactionFail = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(confirmConfirmModal());
    dispatch({type: "SENT_TRANSACTION_FAIL"});
  };
};

const sentTransactionFetching = (): SentTransactionFetchingAction => {
  return {
    type: "SENT_TRANSACTION_FETCHING"
  };
};

const sentQtumTransaction = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const transactionState: SendTransactionState = getState().sendTransactionState;
    dispatch(sentTransactionFetching());
    const address: Address = getState().loginState.address;
    const transaction: Transaction = new Transaction()
      .from(transactionState.rawUtxos)
      .to(
        transactionState.toAddress,
        Math.round(transactionState.amount * SATOSHI_COUNT))
      .change(address)
      .addData(transactionState.description)
      .fee(transactionState.fee * SATOSHI_COUNT)
      .sign(getState().loginState.prKey);
    const rawTransaction: string = transaction.serialize(true);
    axios.post(`${getState().config.qtumExplorerPath}/tx/send`, {
      rawtx: rawTransaction
    }).then(() => {
      dispatch(sentTransactionSuccess());
    }, (): void => dispatch(sentTransactionFail()));
  };
};

const sentInkTransaction = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const transactionState: SendTransactionState = getState().sendTransactionState;
    dispatch(sentTransactionFetching());
    const address: Address = getState().loginState.address;
    const asm: string = CryptoHandler.generateInkTransferContractAsm(
      transactionState.toAddress.toString(),
      transactionState.amount
    );
    const transaction: Transaction = new Transaction()
      .from(transactionState.rawUtxos)
      .to(address, 0)
      .change(address)
      .addData(transactionState.description);
    transaction.outputs[0].setScript(qtumcore.Script.fromASM(asm));
    transaction.fee(Math.round(transactionState.fee * SATOSHI_COUNT));
    transaction.sign(getState().loginState.prKey);
    const rawTransaction: string = transaction.serialize(true);
    axios.post(`${getState().config.qtumExplorerPath}/tx/send`, {
      rawtx: rawTransaction
    }).then((resp: $AxiosXHR<Object>) => {
      const pendingTokenTxsIds: Array<string> = getState().amountState.INK.pendigTxs;
      pendingTokenTxsIds.push(resp.data.txid);
      dispatch(setInkTokenPendingDataAction(pendingTokenTxsIds, true));
      dispatch(sentTransactionSuccess());
    }, (): void => dispatch(sentTransactionFail()));
  };
};

export const sentTransaction = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    // eslint-disable-next-line no-unused-expressions
    getState().sendTransactionState.tokenType === SUPPORTED_CURRENCIES.QTUM
      ? dispatch(sentQtumTransaction())
      : dispatch(sentInkTransaction());
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

const setStakingBalance = (balance: number): SetStakingBalanceAction => {
  return {
    type: "SET_STAKING_BALANCE",
    stakingBalance: balance
  };
};

export const requestUtxos = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(requestUTXOFetching());
    const address: string = getState().loginState.address.toString();
    axios.get(`${getState().config.qtumExplorerPath}/addrs/${address}/utxo`)
      .then((response: $AxiosXHR<Array<Object>>) => {
        const stakingUtxos: Array<Object> = _.filter(response.data, (utxo: Object): boolean => {
          return utxo.isStake && utxo.confirmations <= UTXO_STAKING_CONFIRMATIONS_LOCK;
        });
        let stakingAmount: number = 0;
        stakingUtxos.forEach((utxo: Object) => {
          stakingAmount += utxo.amount;
        });
        dispatch(setStakingBalance(stakingAmount));
        // eslint-disable-next-line max-len
        const unstakenUtxos: Array<Object> = _.filter(response.data, (utxo: Object): boolean => {
          return !utxo.isStake || utxo.confirmations > UTXO_STAKING_CONFIRMATIONS_LOCK;
        });
        // eslint-disable-next-line no-return-assign
        const availableAmount: number = response.data.reduce(((value: number, utxo: Object) => value += utxo.amount), 0);
        const utxos: Array<Transaction.UnspentOutput> = unstakenUtxos.map((utxo: Object): Transaction.UnspentOutput => {
          return new Transaction.UnspentOutput(utxo);
        });
        dispatch(requestUTXOSuccess(utxos));
        dispatch(setAvailableAmount(availableAmount));
      }, () => {
        dispatch(openRequestFailModalForce());
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
        const recommendedFee: number = response.data[2];
        dispatch(requestRecommendedFeeSuccess(recommendedFee + (recommendedFee * FEE_INCREASE_COEF)));
      }, () => {
        dispatch(openRequestFailModalForce());
        dispatch(requestRecommendedFeeFail());
      });
  };
};

export const openModal = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch(requestUtxos());
    dispatch(requestRecomendedFee());
    dispatch({type: "OPEN_MODAL"});
  };
};

