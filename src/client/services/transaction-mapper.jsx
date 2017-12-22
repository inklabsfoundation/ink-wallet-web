/* eslint-disable max-params */
// @flow
import * as _ from "lodash";
import math from "mathjs";
import type {Decimal} from "mathjs";

export type LastTransaction = {
  value: number,
  isIn: boolean,
  currencyName: string,
  timestamp: number
}

const TRANSACTIONS_COUNT: number = 4;

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
      let value: number = 0;
      let inputValue: Decimal = math.bignumber(0);
      let outputValue: Decimal = math.bignumber(0);
      transaction.vin.forEach((inTransaction: Object): void => {
        if (inTransaction.addr === address) {
          inputValue = math.add(math.bignumber(inputValue), math.bignumber(inTransaction.value));
        }
      });
      transaction.vout.forEach((outTransaction: Object): void => {
        if (outTransaction.scriptPubKey.addresses &&
          _.find(outTransaction.scriptPubKey.addresses,
            (outAddress: string): boolean => outAddress === address)
        ) {
          outputValue = math.add(math.bignumber(outputValue), math.bignumber(outTransaction.value));
        }
      });
      value = math.subtract(outputValue, inputValue);
      const isIn: boolean = (value >= 0);

      return {
        value,
        isIn,
        currencyName,
        timestamp: transaction.time
      };
    }
  );
};
