/* eslint-disable no-console */
// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import * as _ from "lodash";
import Mnemonic from "bitcore-mnemonic";
import {HDPrivateKey, PrivateKey, Networks, Address} from "@evercode-lab/qtumcore-lib";

export const STEPS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3
};

type ResetCreationAction = {
  type: "RESET_CREATION_ACTION"
};

type SetInputPasswordAction = {
  type: "SET_INPUT_PASSWORD_ACTION",
  inputPassword: string
};

type SetInputMnemonicAction = {
  type: "SET_INPUT_MNEMONIC",
  inputMnemonic: string
};

type SetInputRepeatPasswordAction = {
  type: "SET_INPUT_REPEAT_PASSWORD_ACTION",
  inputRepeatPassword: string
};

type CommitCreationAction = {
  type: "COMMIT_CREATION_ACTION",
  mnemonic: Mnemonic,
  address: Address,
  hdPrivateKey: HDPrivateKey,
  privateKey: PrivateKey,
  seed: any
};

type CommitAddressAction = {
  type: "COMMIT_ADDRESS_ACTION"
};

type SetPasswordCreationErrorAction = {
  type: "SET_PASSWORD_CREATION_ERROR_ACTION",
  areInputPasswordsEqual: boolean,
  arePasswordsValid: boolean,
  isPasswordShort: boolean
};

const PASSWORD_MIN_LENGTH = 6;

type SetAgreedAction = {
  type: "SET_AGREED_ACTION",
  isAgreed: boolean
};

type SetMnemonicRestoreErrorAction = {
  type: "SET_MNEMONIC_RESTORE_ERROR",
  isInputMnemonicEmpty: boolean,
  isInputMnemonicValid: boolean
};

type CommitResetPasswordAction = {
  type: "COMMIT_RESET_PASSWORD_ACTION"
};

export type CreateWalletAction = ResetCreationAction | SetPasswordCreationErrorAction |
  SetAgreedAction | SetInputPasswordAction | SetInputRepeatPasswordAction |
  CommitCreationAction | CommitAddressAction | SetInputMnemonicAction |
  SetMnemonicRestoreErrorAction | CommitResetPasswordAction;

const arePasswordsEqual = (password: string, repeatPassword: string): boolean => {
  return password === repeatPassword;
};

const arePasswordsEmpty = (password: string, repeatPassword: string): boolean => {
  return (_.isEmpty(password) && _.isEmpty(repeatPassword));
};

const setPasswordCreationError = (areInputPasswordsEqual: boolean,
                                  arePasswordsValid: boolean,
                                  isPasswordShort: boolean): SetPasswordCreationErrorAction => {
  return {
    type: "SET_PASSWORD_CREATION_ERROR_ACTION",
    areInputPasswordsEqual,
    arePasswordsValid,
    isPasswordShort
  };
};

export const setInputRepeatPassword = (password: string): SetInputRepeatPasswordAction => {
  return {
    type: "SET_INPUT_REPEAT_PASSWORD_ACTION",
    inputRepeatPassword: password
  };
};

export const setInputMnemonic = (inputMnemonic: string): SetInputMnemonicAction => {
  return {
    type: "SET_INPUT_MNEMONIC",
    inputMnemonic
  };
};

const setMnemonicRestoreError = (isInputMnemonicEmpty: boolean,
                                 isInputMnemonicValid: boolean): SetMnemonicRestoreErrorAction => {
  return {
    type: "SET_MNEMONIC_RESTORE_ERROR",
    isInputMnemonicEmpty,
    isInputMnemonicValid
  };
};

const commitCreation = (derivePath: string, inputMnemonic: ?string): CommitCreationAction => {
  const mnemonic: Mnemonic = (inputMnemonic) ? new Mnemonic(inputMnemonic) : new Mnemonic();
  const hdPrivateKey: HDPrivateKey = HDPrivateKey.fromSeed(mnemonic.toSeed(), Networks.livenet);
  const privateKey: PrivateKey = hdPrivateKey.deriveChild(derivePath).privateKey;
  const address: Address = privateKey.toAddress(Networks.livenet);
  return {
    type: "COMMIT_CREATION_ACTION",
    mnemonic,
    hdPrivateKey,
    privateKey,
    address,
    seed: mnemonic.toSeed()
  };
};

const commitReset = (): CommitResetPasswordAction => {
  return {
    type: "COMMIT_RESET_PASSWORD_ACTION"
  };
};

export const tryToCommitMnemonic = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const inputMnemonic = getState().creationState.inputMnemonic;
    const isValid: boolean = Mnemonic.isValid(inputMnemonic);
    const isEmpty: boolean = inputMnemonic.length === 0;
    if (!isValid || isEmpty) {
      dispatch(setMnemonicRestoreError(isEmpty, isValid));
    } else {
      dispatch(commitCreation(getState().config.derivePath, inputMnemonic));
    }
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

export const setAgreed = (isAgreed: boolean): SetAgreedAction => {
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

export const tryToCommitResetPasswords = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const isValid: boolean = !arePasswordsEmpty(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    const areEqual: boolean = arePasswordsEqual(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    const isPasswordShort: boolean = areEqual &&
      getState().creationState.inputPassword.length < PASSWORD_MIN_LENGTH;
    if (!isValid || !areEqual || isPasswordShort) {
      dispatch(setPasswordCreationError(areEqual, isValid, isPasswordShort));
    } else {
      dispatch(commitReset());
    }
  };
};
//TODO Unite with function above
export const tryToCommitPasswords = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const isValid: boolean = !arePasswordsEmpty(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    const areEqual: boolean = arePasswordsEqual(
      getState().creationState.inputPassword,
      getState().creationState.inputRepeatPassword
    );
    const isPasswordShort: boolean = areEqual &&
      getState().creationState.inputPassword.length < PASSWORD_MIN_LENGTH;
    if (!isValid || !areEqual || isPasswordShort) {
      dispatch(setPasswordCreationError(areEqual, isValid, isPasswordShort));
    } else {
      dispatch(commitCreation(getState().config.derivePath));
    }
  };
};

