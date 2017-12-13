// @flow

export type LoginState = {};
export type CreationState = {};
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
  creationState: {},
  restoreState: {},
  i18n: {
    locale: "en",
    translations: {}
  }
};
