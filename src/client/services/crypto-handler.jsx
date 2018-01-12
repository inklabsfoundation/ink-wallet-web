// @flow
import * as base58 from "@evercode-lab/qtumcore-lib/lib/encoding/base58";
import inkContractABI from "./abi/ink";
import {Contract} from "qtumjs";
import {TOKENS_COUNT} from "../types/consts";

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
}
