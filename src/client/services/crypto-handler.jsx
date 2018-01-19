/* eslint-disable new-cap */
// @flow
import * as base58 from "@evercode-lab/qtumcore-lib/lib/encoding/base58";
import inkContractABI from "./abi/ink";
import {Contract} from "qtumjs";
import {TOKENS_COUNT} from "../types/consts";
import CryptoJS, {SHA256} from "crypto-js";
import Mnemonic from "bitcore-mnemonic";

export default class CryptoHandler {
  static convertToHexAddress(address: string): string {
    // eslint-disable-next-line no-magic-numbers
    return base58.decode(address.toString()).toString("hex").slice(2, 42);
  }

  static generateInkTransferContractAsm(address: string, amount: number): string {
    const inkContract: Contract = new Contract(null, inkContractABI);
    const contractData: string = inkContract.encodeParams(
      "transfer",
      [`0x${CryptoHandler.convertToHexAddress(address)}`, (amount * TOKENS_COUNT).toString()]
    );
    return `04 4197635 40 ${contractData} ${inkContractABI.address} OP_CALL`;
  }

  static generateBackupFile(derivePath: string, password: string, mnemonic: Mnemonic): string  {
    const backupObject = {
      seed: Buffer.from(mnemonic.toSeed()).toString("hex"),
      derivePath,
      mnemonic: mnemonic.toString()
    };
    const backupFile = CryptoJS.AES.encrypt(JSON.stringify(backupObject), password);
    return `data:application/octet-stream,${backupFile}`;
  }

  static getBufferFromHex(hex: string): Buffer {
    return CryptoJS.hexToBytes(hex);
  }

  static isPasswordCorrect(passwordHash: string, password: string, salt: string): boolean  {
    return SHA256(password + salt).toString() === passwordHash;
  }
}
