/* eslint-disable max-params,new-cap */
// @flow
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import {HDPrivateKey, Networks, Address, PublicKey, PrivateKey} from "qtumcore-lib";
import {SHA256} from "crypto-js";

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

export type AuthAction = LoginAction | LogoutAction;

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

export const tryToLogin = (seed: Uint8Array, password: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const passwordHash = SHA256(password + getState().config.encryptSolt);
    const privateKey = (HDPrivateKey.fromSeed(seed, Networks.livenet))
      .derive(getState().config.derivePath).privateKey;
    const publicKey = privateKey.toPublicKey();
    const address = publicKey.toAddress(Networks.livenet);
    dispatch(executeLogin(seed, passwordHash, publicKey, privateKey, address));
  };
};


