// @flow
import Mnemonic from "bitcore-mnemonic";
import {HDPrivateKey, PrivateKey, Address} from "qtumcore-lib";

export type LoginState = {};
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
  address: ?Address
};
export type RestoreState = {};
export type I18n = {
  locale: string,
  translations: Object
};

export type State = {
  +loginState: LoginState,
  +creationState: CreationState,
  +restoreState: RestoreState,
  i18n: I18n,
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
    isAgreed: false,
    mnemonic: {},
    hdPrivateKey: {},
    privateKey: {},
    address: {}
  },
  restoreState: {},
  i18n: {
    locale: "en",
    translations: {}
  }
};
