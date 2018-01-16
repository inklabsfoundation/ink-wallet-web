/* eslint-disable max-params,new-cap */
// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import {HDPrivateKey, Networks, Address, PublicKey, PrivateKey} from "@evercode-lab/qtumcore-lib";
import CryptoJS, {SHA256, AES} from "crypto-js";

type LoginAction = {
  type: "LOGIN_ACTION",
  seed: Uint8Array,
  passwordHash: string,
  pubKey: PublicKey,
  prKey: PrivateKey,
  address: Address
}

type LogoutAction = {
  type: "LOGOUT_ACTION"
}

type InputPasswordAction = {
  type: "INPUT_PASSWORD_ACTION",
  password: string
}

type FileUploadAction = {
  type: "FILE_UPLOAD_ACTION",
  backupFile: File
}

type DataErrorAction = {
  type: "DATA_ERROR_ACTION"
}

type AttemptLoginAction = {
  type: "ATTEMPT_LOGIN_ACTION",
  password: string,
  backupFile: File
}

export type AuthAction = LoginAction | LogoutAction | InputPasswordAction | FileUploadAction
  | DataErrorAction | AttemptLoginAction;

const executeLogin = (seed: Uint8Array,
                      passwordHash: string,
                      pubKey: PublicKey,
                      prKey: PrivateKey,
                      address: Address): LoginAction => {
  return {
    type: "LOGIN_ACTION",
    seed,
    passwordHash,
    pubKey,
    prKey,
    address
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

export const inputPassword = (password: string) : InputPasswordAction => {
  return {
    type: "INPUT_PASSWORD_ACTION",
    password
  };
};

export const fileUpload = (backupFile: File) : FileUploadAction => {
  return {
    type: "FILE_UPLOAD_ACTION",
    backupFile
  };
};

export const tryToLogin = (seed: Uint8Array, password: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const passwordHash = (SHA256(password + getState().config.encryptSalt).toString());
    const privateKey = (HDPrivateKey.fromSeed(seed, Networks.livenet))
      .derive(getState().config.derivePath).privateKey;
    const publicKey = privateKey.toPublicKey();
    const address = privateKey.toAddress();
    dispatch(executeLogin(seed, passwordHash, publicKey, privateKey, address));
  };
};


export const attemptLogin = (password: string, backupFile: File) : ThunkAction => {
  return (dispatch: Dispatch) => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      const decrypted: string = AES.decrypt(e.target.result, password)
        .toString(CryptoJS.enc.Latin1);
      if (!/^{"seed":/.test(decrypted)) {
        dispatch(dataError());
      } else {
        const decryptedData: Object = JSON.parse(decrypted);
        dispatch(tryToLogin(decryptedData.seed, password));
      }
    };
    fileReader.readAsText(backupFile);
  };
};
