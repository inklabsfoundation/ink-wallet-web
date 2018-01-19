/* eslint-disable max-params,no-magic-numbers */
// @flow
import * as _ from "lodash";
import math from "mathjs";
import type {Decimal} from "mathjs";
import {TOKENS_COUNT} from "../types/consts";
import type {AmountState} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";

export type LastTransaction = {
  value: number,
  isIn: boolean,
  currencyName: string,
  timestamp: number
};

const TRANSACTIONS_COUNT: number = 4;

const mapQtumTransactions = (currencyName: string,
                             address: string,
                             txs: Array<Object>): Array<LastTransaction> => {
  if (txs.length === 0) {
    return [];
  }

  return txs.map((transaction: Object): LastTransaction => {
      let value: number = 0;
      let inputValue: Decimal = math.bignumber(0);
      let outputValue: Decimal = math.bignumber(0);
      transaction.vin.forEach((inTransaction: Object) => {
        if (inTransaction.addr === address) {
          inputValue = math.add(math.bignumber(inputValue), math.bignumber(inTransaction.value));
        }
      });
      transaction.vout.forEach((outTransaction: Object) => {
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

const mapTokensTransactions = (currencyName: string,
                               address: string,
                               txs: Array<Object>): Array<LastTransaction> => {
  if (txs.length === 0) {
    return [];
  }

  return txs.map((transaction: Object): LastTransaction => {
      let value: Decimal = math.bignumber(0);
      if (transaction.from === address) {
        value = math.subtract(value, math.bignumber(transaction.value));
      } else {
        value = math.add(value, math.bignumber(transaction.value));
      }
      value = math.divide(value, TOKENS_COUNT);
      const isIn: boolean = (value >= 0);
      // $FlowFixMe
      const timestamp: number = Date.parse(transaction.block_date_time) / 1000;
      return {
        value,
        isIn,
        currencyName,
        timestamp
      };
    }
  );
};

// eslint-disable-next-line max-len
export const mapLastTransactions = (walletData: AmountState, address: string): Array<LastTransaction> => {
  const qtumTransactions: Array<LastTransaction> = mapQtumTransactions(
    SUPPORTED_CURRENCIES.QTUM,
    address,
    walletData.QTUM.txs
  );
  const inkTransactions: Array<LastTransaction> = mapTokensTransactions(
    SUPPORTED_CURRENCIES.INK,
    address,
    walletData.INK.txs
  );
  let lastTransactions: Array<LastTransaction> = qtumTransactions.concat(inkTransactions);
  lastTransactions = _.sortBy(
    lastTransactions,
    (transaction: LastTransaction): number  => transaction.timestamp
  ).reverse();
  if (lastTransactions.length > TRANSACTIONS_COUNT) {
    lastTransactions = lastTransactions.slice(0, TRANSACTIONS_COUNT);
  }

  return lastTransactions;
};
