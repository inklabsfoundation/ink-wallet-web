/* eslint-disable max-params */
// @flow
import * as _ from "lodash";

export type LastTransaction = {
  value: number,
  isIn: boolean,
  currencyName: string,
  timestamp: number
}

const TRANSACTIONS_COUNT: number = 4;

const findFormOutsAndOperate = (value: number, transaction, address, isSumm: boolean): number => {
  transaction.vout.forEach((outTransaction: Object): void => {
    if (outTransaction.scriptPubKey.addresses &&
      _.find(outTransaction.scriptPubKey.addresses,
        (outAddress: string): boolean => outAddress === address)
    ) {
      value = isSumm ? value + (+outTransaction.value) : value - (+outTransaction.value);
    }
  });
  return value;
};

export const mapLastTransactions = (currencyName: string,
                                    address: string,
                                    txs: Array<Object>): Array<LastTransaction> => {
  if (txs.length === 0) {
    return [];
  }
  if (txs.length > TRANSACTIONS_COUNT) {
    txs = txs.slice(0, TRANSACTIONS_COUNT);
  }
  return txs.map((transaction: Object): LastTransaction => {
    let isIn: boolean = false;
    let value: number = 0;
    if (transaction.vin.length === 0) {
      isIn = true;
      value = findFormOutsAndOperate(value, transaction, address, true);
    } else {
      let isAdressFoundInInput: boolean = false;
      transaction.vin.forEach((inTransaction: Object): void => {
        if (inTransaction.addr === address) {
          isAdressFoundInInput = true;
          value += inTransaction.value;
        }
      });
      if (isAdressFoundInInput) {
        isIn = false;
        value = findFormOutsAndOperate(value, transaction, address, false);
      } else {
        isIn = true;
        value = findFormOutsAndOperate(value, transaction, address, true);
      }
    }
    return {
      value,
      isIn,
      currencyName,
      timestamp: transaction.time
    };
  });
};
