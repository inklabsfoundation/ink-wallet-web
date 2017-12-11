// @flow

export type LoginState = {};
export type CreationState = {};
export type RestoreState = {};

export type State = {
  +loginState: LoginState,
  +creationState: CreationState,
  +restoreState: RestoreState
}

export const initialState: State = {
  loginState: {},
  creationState: {},
  restoreState: {}
};
