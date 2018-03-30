// @flow

import type {WalletAmount} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import {TOKENS_COUNT} from "../types/consts";
import type {LastTransaction} from "./transaction-mapper";
import {mapQtumTransaction} from "./transaction-mapper";

export type Amount = {
  inValue: number,
  outValue: number
};

// eslint-disable-next-line max-params
export const calculatePendingAmount = (currencyName: string,
                                       amountState: WalletAmount,
                                       height: number = 0,
                                       address: string): Amount => {
  const pendingAmount: Amount = {
    inValue: 0,
    outValue: 0
  };

  amountState.txs.forEach((tx: Object) => {
    if (currencyName === SUPPORTED_CURRENCIES.QTUM) {
      const mappedTransaction: LastTransaction = mapQtumTransaction(currencyName, address, tx);
      const tempAmount: number = +tx.confirmations === 0 ? +mappedTransaction.value : 0;
      if (mappedTransaction.isIn) {
        pendingAmount.inValue += tempAmount;
      } else {
        pendingAmount.outValue += -tempAmount;
      }
    }
  });

  return pendingAmount;
};
