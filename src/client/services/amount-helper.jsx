// @flow

import type {WalletAmount} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import type {LastTransaction} from "./transaction-mapper";
import {mapQtumTransaction} from "./transaction-mapper";

export type Amount = {
  inValue: number,
  outValue: number
};

const MAX_AMOUNT_LENGTH = 9;
const AMOUNT_OFFSET = 7;

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

export const valueFilter = (amount: string | number): string => {
  return (amount.toString().length >= MAX_AMOUNT_LENGTH) ? (+amount).toFixed(AMOUNT_OFFSET) : amount.toString();
};
