/* eslint-disable max-params,new-cap */
// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import {HDPrivateKey, Networks, Address, PublicKey, PrivateKey} from "@evercode-lab/qtumcore-lib";
import Mnemonic from "bitcore-mnemonic";
import CryptoJS, {SHA256, AES} from "crypto-js";
import {EXIT_MODAL_SHOW_KEY} from "../services/confirm-exit-handler";
import {isClientSide} from "../services/is-client-side-helper";

type LoginAction = {
  type: "LOGIN_ACTION",
  seed: Uint8Array,
  passwordHash: string,
  pubKey: PublicKey,
  prKey: PrivateKey,
  address: Address,
  mnemonic: Mnemonic
};

type LogoutAction = {
  type: "LOGOUT_ACTION"
};

type InputPasswordAction = {
  type: "INPUT_PASSWORD_ACTION",
  password: string
};

type FileUploadAction = {
  type: "FILE_UPLOAD_ACTION",
  backupFile: File
};

type SetLastTransactionTimeStampAction = {
  type: "SET_LAST_TRASACTION_TIME_STAMP_ACTION",
  timestamp: number
};

type DataErrorAction = {
  type: "DATA_ERROR_ACTION"
};

type DontShowExitModalAction = {
  type: "DONT_SHOW_EXIT_MODAL_ACTION"
};

type ShowExitModalAction = {
  type: "SHOW_EXIT_MODAL_ACTION"
};

type AttemptLoginAction = {
  type: "ATTEMPT_LOGIN_ACTION",
  password: string,
  backupFile: File
};

type OpenExitModalAction = {
  type: "OPEN_EXIT_MODAL_ACTION"
};

type OpenRequestFailModalAction = {
  type: "OPEN_REQUEST_FAIL_MODAL_ACTION"
};

type CloseRequestFailModalAction = {
  type: "CLOSE_REQUEST_FAIL_MODAL_ACTION"
};

type OpenNewTransactionsModalAction = {
  type: "OPEN_NEW_TRANSACTIONS_MODAL_ACTION"
};

type CloseNewTransactionsModalAction = {
  type: "CLOSE_NEW_TRANSACTIONS_MODAL_ACTION"
};

type SetExitAction = {
  type: "SET_EXIT_ACTION"
};

type CloseExitModalAction = {
  type: "CLOSE_EXIT_MODAL_ACTION"
};

export type AuthAction = LoginAction | LogoutAction | InputPasswordAction | FileUploadAction
  | DataErrorAction | AttemptLoginAction | DontShowExitModalAction | OpenExitModalAction | CloseExitModalAction
  | SetExitAction | ShowExitModalAction | SetLastTransactionTimeStampAction | OpenRequestFailModalAction
  | CloseRequestFailModalAction | OpenNewTransactionsModalAction | CloseNewTransactionsModalAction;

const executeLogin = (seed: Uint8Array,
                      passwordHash: string,
                      pubKey: PublicKey,
                      prKey: PrivateKey,
                      address: Address,
                      mnemonic: Mnemonic): LoginAction => {
  return {
    type: "LOGIN_ACTION",
    seed,
    passwordHash,
    pubKey,
    prKey,
    address,
    mnemonic
  };
};

export const openNewTransactionsModal = (): OpenNewTransactionsModalAction => {
  return {
    type: "OPEN_NEW_TRANSACTIONS_MODAL_ACTION"
  };
};

export const closeNewTransactionsModal = (): CloseNewTransactionsModalAction => {
  return {
    type: "CLOSE_NEW_TRANSACTIONS_MODAL_ACTION"
  };
};

export const openExitModal = (): OpenExitModalAction => {
  return {
    type: "OPEN_EXIT_MODAL_ACTION"
  };
};

export const openRequestFailModal = (): OpenRequestFailModalAction => {
  return {
    type: "OPEN_REQUEST_FAIL_MODAL_ACTION"
  };
};

export const closeRequestFailModal = (): CloseRequestFailModalAction => {
  return {
    type: "CLOSE_REQUEST_FAIL_MODAL_ACTION"
  };
};

export const setExit = (): SetExitAction => {
  return {
    type: "SET_EXIT_ACTION"
  };
};

export const setLastTransactionTimeStamp = (timestamp: number): SetLastTransactionTimeStampAction => {
  return {
    type: "SET_LAST_TRASACTION_TIME_STAMP_ACTION",
    timestamp
  };
};

export const closeExitModal = (): CloseExitModalAction => {
  return {
    type: "CLOSE_EXIT_MODAL_ACTION"
  };
};

export const dontShowModal = (): DontShowExitModalAction => {
  if (isClientSide()) {
    localStorage.setItem(EXIT_MODAL_SHOW_KEY, "false");
  }

  return {
    type: "DONT_SHOW_EXIT_MODAL_ACTION"
  };
};

export const showModal = (): ShowExitModalAction => {
  if (isClientSide()) {
    localStorage.setItem(EXIT_MODAL_SHOW_KEY, "true");
  }

  return {
    type: "SHOW_EXIT_MODAL_ACTION"
  };
};

export const tryToLogout = (): LogoutAction => {
  return {
    type: "LOGOUT_ACTION"
  };
};

const dataError = (): DataErrorAction => {
  return {
    type: "DATA_ERROR_ACTION"
  };
};

export const inputPassword = (password: string): InputPasswordAction => {
  return {
    type: "INPUT_PASSWORD_ACTION",
    password
  };
};

export const fileUpload = (backupFile: File): FileUploadAction => {
  return {
    type: "FILE_UPLOAD_ACTION",
    backupFile
  };
};

export const tryToLogin = (seed: Uint8Array, password: string, mnemonic: Mnemonic): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const passwordHash = (SHA256(password + getState().config.encryptSalt).toString());
    const privateKey = (HDPrivateKey.fromSeed(seed, Networks.livenet))
      .derive(getState().config.derivePath).privateKey;
    const publicKey = privateKey.toPublicKey();
    const address = privateKey.toAddress();
    dispatch(executeLogin(seed, passwordHash, publicKey, privateKey, address, mnemonic));
  };
};


export const attemptLogin = (password: string, backupFile: File): ThunkAction => {
  return (dispatch: Dispatch) => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const decrypted: string = AES.decrypt(e.target.result, password)
        .toString(CryptoJS.enc.Latin1);
      if (!/^{"seed":/.test(decrypted)) {
        dispatch(dataError());
      } else {
        const decryptedData: Object = JSON.parse(decrypted);
        dispatch(tryToLogin(decryptedData.seed, password, new Mnemonic(decryptedData.mnemonic)));
      }
    };
    fileReader.readAsText(backupFile);
  };
};
