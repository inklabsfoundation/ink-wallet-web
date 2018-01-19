// @flow

type OpenErrorModalAction = {
  type: "OPEN_ERROR_MODAL"
};

type CloseErrorModalAction = {
  type: "CLOSE_ERROR_MODAL"
};

type OpenMnemonicsModalAction = {
  type: "OPEN_MNEMONICS_MODAL"
};

type CloseMnemonicsModalAction = {
  type: "CLOSE_MNEMONICS_MODAL"
};

type SetPasswordSecurityAction = {
  type: "SET_PASSWORD_SECURITY_ACTION",
  password: string
};

export type SecurityCenterAction = OpenErrorModalAction | CloseErrorModalAction
  | OpenMnemonicsModalAction | CloseMnemonicsModalAction | SetPasswordSecurityAction;

export const openErrorModal = (): OpenErrorModalAction => {
  return {
    type: "OPEN_ERROR_MODAL"
  };
};

export const closeErrorModal = (): CloseErrorModalAction => {
  return {
    type: "CLOSE_ERROR_MODAL"
  };
};

export const openMnemonicModal = (): OpenMnemonicsModalAction => {
  return {
    type: "OPEN_MNEMONICS_MODAL"
  };
};

export const closeMnemonicModal = (): CloseMnemonicsModalAction => {
  return {
    type: "CLOSE_MNEMONICS_MODAL"
  };
};

export const setPasswordSecurity = (password: string): SetPasswordSecurityAction => {
  return {
    type: "SET_PASSWORD_SECURITY_ACTION",
    password
  };
};
