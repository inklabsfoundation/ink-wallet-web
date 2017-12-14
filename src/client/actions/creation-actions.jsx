// @flow
import type {ThunkAction} from "../types/redux";
import * as _ from "lodash";
import Mnemonic from "bitcore-mnemonic";
import {HDPrivateKey, PrivateKey, Networks, Address} from "qtumcore-lib";

export const STEPS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3
};

type ResetCreationAction = {
  type: "RESET_CREATION_ACTION"
}

type SetInputPasswordAction = {
  type: "SET_INPUT_PASSWORD_ACTION",
  inputPassword: string,
}

type SetInputRepeatPasswordAction = {
  type: "SET_INPUT_REPEAT_PASSWORD_ACTION",
  inputRepeatPassword: string
}

type CommitPasswordCreationAction = {
  type: "COMMIT_PASSWORD_CREATION_ACTION",
  mnemonic: Mnemonic,
  address: Address,
  hdPrivateKey: HDPrivateKey,
  privateKey: PrivateKey
}

type CommitAddressAction = {
  type: "COMMIT_ADDRESS_ACTION"
}

type SetPasswordCreationErrorAction = {
  type: "SET_PASSWORD_CREATION_ERROR_ACTION",
  areInputPasswordsEqual: boolean,
  arePasswordsValid: boolean
}

type SetAgreedAction = {
  type: "SET_AGREED_ACTION",
  isAgreed: boolean
}

export type CreateWalletAction = ResetCreationAction | SetPasswordCreationErrorAction |
  SetAgreedAction | SetInputPasswordAction | SetInputRepeatPasswordAction |
  CommitPasswordCreationAction | CommitAddressAction;

const arePasswordsEqual = (password: string, repeatPassword: string): boolean => {
  return password === repeatPassword;
};

const arePasswordsEmpty = (password: string, repeatPassword: string): boolean => {
  return (_.isEmpty(password) && _.isEmpty(repeatPassword));
};

const setPasswordCreationError = (
  areInputPasswordsEqual: boolean,
  arePasswordsValid: boolean): SetPasswordCreationErrorAction => {
  return {
    type: "SET_PASSWORD_CREATION_ERROR_ACTION",
    areInputPasswordsEqual,
    arePasswordsValid
  };
};

export const setInputRepeatPassword = (password: string): SetInputRepeatPasswordAction => {
  return {
    type: "SET_INPUT_REPEAT_PASSWORD_ACTION",
    inputRepeatPassword: password
  };
};

const commitPasswordCreation = (): CommitPasswordCreationAction => {
  const mnemonic: Mnemonic = new Mnemonic();
  const hdPrivateKey: HDPrivateKey = HDPrivateKey.fromSeed(mnemonic.toSeed(), Networks.livenet);
  const privateKey: PrivateKey = hdPrivateKey.derive("m/88'/0'/1").privateKey;
  const address: Address = (privateKey.toPublicKey()).toAddress(Networks.livenet);
  return {
    type: "COMMIT_PASSWORD_CREATION_ACTION",
    mnemonic,
    hdPrivateKey,
    privateKey,
    address
  };
};

export const commitAddress = (): CommitAddressAction => {
  return {
    type: "COMMIT_ADDRESS_ACTION"
  };
};

export const resetCreation = (): ResetCreationAction => {
  return {
    type: "RESET_CREATION_ACTION"
  };
};

export const setAgreed = (isAgreed: any): SetAgreedAction => {
  return {
    type: "SET_AGREED_ACTION",
    isAgreed
  };
};

export const setInputPassword = (password: string): SetInputPasswordAction => {
  return {
    type: "SET_INPUT_PASSWORD_ACTION",
    inputPassword: password
  };
};

export const tryToCommitPasswords = (): ThunkAction => {
  return (dispatch, getState) => {
    const isValid: boolean = !arePasswordsEmpty(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    const areEqual: boolean = arePasswordsEqual(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    if (!isValid || !areEqual) {
      dispatch(setPasswordCreationError(areEqual, isValid));
    } else {
      dispatch(commitPasswordCreation());
    }
  };
};

