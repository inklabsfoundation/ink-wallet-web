// @flow
import Mnemonic from "bitcore-mnemonic";
import {HDPrivateKey, PrivateKey, Address, PublicKey, Transaction} from "qtumcore-lib";

export type LoginState = {
  isLoggedIn: boolean;
  seed: ?Uint8Array,
  passwordHash: ?string,
  pubKey: ?PublicKey,
  prKey: ?PrivateKey,
  address: Address
};

export type ConfigState = {
  defaultLocale: string,
  derivePath: string,
  qtumExplorerPath: string,
  encryptSalt: string,
  INKcontractAddress: string
}

export type SendTransactionState = {
  tokenType: string,
  toAddress: string,
  amount: number,
  description: string,
  fee: number,
  isRecommendedFeeFetching: boolean,
  recommendedFee: number,
  isModalOpen: boolean,
  conformationalPassword: string,
  rawUtxos: ?Array<Transaction.UnspentOutput>,
  areRawUtxosFetching: boolean,
  isSucceed: boolean,
  isTransactionIsSending: boolean,
  step: number
}

export const SUPPORTED_CURRENCIES = {
  QTUM: "QTUM",
  INK: "INK"
};

export type WalletAmount = {
  balance: number,
  label: string,
  isAmountFetching: boolean,
  areTxsFetching: boolean,
  txs: Array<Object>
}

export type AmountState = {
  QTUM: WalletAmount,
  INK: WalletAmount
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
  seed: ?Uint8Array,
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
  +amountState: AmountState,
  +config: ConfigState,
  +sendTransactionState: SendTransactionState
}

export const initialState: State = {
  loginState: {
    isLoggedIn: false,
    seed: null,
    passwordHash: "",
    pubKey: {},
    prKey: {},
    address: {}
  },
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
    seed: null,
    hdPrivateKey: {},
    privateKey: {},
    address: {}
  },
  i18n: {
    locale: "en",
    translations: {}
  },
  amountState: {
    QTUM: {
      balance: 0,
      label: "Qtum",
      isAmountFetching: false,
      areTxsFetching: false,
      txs: []
    },
    INK: {
      balance: 0,
      label: "Ink",
      isAmountFetching: false,
      areTxsFetching: false,
      txs: []
    }
  },
  sendTransactionState: {
    tokenType: "",
    toAddress: "",
    amount: 0,
    description: "",
    fee: 0,
    isRecommendedFeeFetching: false,
    recommendedFee: 0,
    isModalOpen: false,
    conformationalPassword: "",
    rawUtxos: [],
    areRawUtxosFetching: false,
    isSucceed: false,
    isTransactionIsSending: false,
    step: 0
  },
  config: {
    derivePath: "",
    defaultLocale: "",
    qtumExplorerPath: "",
    encryptSalt: "",
    INKcontractAddress: ""
  }
};
