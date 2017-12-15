// @flow
import Mnemonic from "bitcore-mnemonic";
import {HDPrivateKey, PrivateKey, Address} from "qtumcore-lib";

export type LoginState = {};
export type ConfigState = {
  defaultLocale: string,
  derivePath: string
}
export type CreationState = {
  step: number,
  password: string,
  inputPassword: string,
  areInputPasswordsEqual: boolean,
  arePasswordsValid: boolean,
  isAgreed: boolean,
  inputRepeatPassword: string,
  mnemonic: ?Mnemonic,
  hdPrivateKey: ?HDPrivateKey,
  privateKey: ?PrivateKey,
  address: ?Address,
  inputMnemonic: string,
  isInputMnemonicEmpty: boolean,
  isInputMnemonicValid: boolean,
};
export type I18n = {
  locale: string,
  translations: Object
};

export type State = {
  +loginState: LoginState,
  +creationState: CreationState,
  i18n: I18n,
  +config: ConfigState
}

export const initialState: State = {
  loginState: {},
  creationState: {
    step: 1,
    password: "",
    inputPassword: "",
    inputRepeatPassword: "",
    areInputPasswordsEqual: true,
    arePasswordsValid: true,
    inputMnemonic: "",
    isInputMnemonicEmpty: false,
    isInputMnemonicValid: true,
    isAgreed: false,
    mnemonic: {},
    hdPrivateKey: {},
    privateKey: {},
    address: {}
  },
  i18n: {
    locale: "en",
    translations: {}
  },
  config: {
    derivePath: "",
    defaultLocale: ""
  }
};
