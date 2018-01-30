// @flow

import type {WalletAmount} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import {TOKENS_COUNT} from "../types/consts";
import type {LastTransaction} from "./transaction-mapper";
import {mapQtumTransaction} from "./transaction-mapper";

// eslint-disable-next-line max-params
export const calculatePendingAmount = (currencyName: string,
                                       amountState: WalletAmount,
                                       height: number = 0,
                                       address: string): number => {
  let pendingAmount = 0;
  amountState.txs.forEach((tx: Object) => {
    if (currencyName === SUPPORTED_CURRENCIES.QTUM) {
      const mappedTransaction: LastTransaction = mapQtumTransaction(currencyName, address, tx);
      const value: number = (+mappedTransaction.value > 0) ? +mappedTransaction.value : 0;
      pendingAmount += +tx.confirmations === 0 ? value : 0;
    } else {
      pendingAmount += !tx.block_height || (tx.block_height >= height) ? +tx.value / TOKENS_COUNT : 0;
    }
  });

  return pendingAmount;
};
