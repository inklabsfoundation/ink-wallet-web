/* eslint-disable max-params,no-magic-numbers */
// @flow
import * as _ from "lodash";
import math from "mathjs";
import type {Decimal} from "mathjs";
import {TOKENS_COUNT} from "../types/consts";
import type {AmountState, TokenDesc} from "../initial-state";
import {SUPPORTED_CURRENCIES} from "../initial-state";
import CryptoJS from "crypto-js";

export type LastTransaction = {
  value: number,
  isIn: boolean,
  currencyName: string,
  timestamp: number,
  tx: Object
};

const TRANSACTIONS_COUNT: number = 4;
export const MY_WALLET_LABEL = "MY_WALLET";

export const mapQtumTransaction = (currencyName: string,
                                   address: string,
                                   transaction: Object): LastTransaction => {
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
    tx: transaction,
    timestamp: transaction.time
  };
};

const mapQtumTransactions = (currencyName: string,
                             address: string,
                             txs: Array<Object>): Array<LastTransaction> => {
  if (txs.length === 0) {
    return [];
  }

  return txs.map((transaction: Object): LastTransaction => {
    return mapQtumTransaction(currencyName, address, transaction);
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
        tx: transaction,
        timestamp
      };
    }
  );
};

const mapTransactions = (walletData: AmountState, address: string): Array<LastTransaction> => {
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

  return lastTransactions;
};

// eslint-disable-next-line max-len
export const mapLastTransactions = (walletData: AmountState, address: string): Array<LastTransaction> => {
  let lastTransactions: Array<LastTransaction> = mapTransactions(walletData, address);
  if (lastTransactions.length > TRANSACTIONS_COUNT) {
    lastTransactions = lastTransactions.slice(0, TRANSACTIONS_COUNT);
  }

  return lastTransactions;
};

export const calcNewTransactionsCount = (amountState: AmountState, address: string, txTimestamp: number, unconfirmedTxIds: Array<string>): ?number => {
  const lastTransactions: Array<LastTransaction> = mapTransactions(amountState, address);
  if (!lastTransactions || lastTransactions.length === 0 || txTimestamp === 0) return null;
  let areAllRequestsComplete: boolean = true;
  Object.keys(amountState).forEach((key: string) => {
    if (!amountState[key].isFirstFetchComplete) {
      areAllRequestsComplete = false;
    }
  });
  if (!areAllRequestsComplete) {
    return null;
  }
  let count: number = 0;
  lastTransactions.forEach((tx: LastTransaction) => {
    let foundOldUncormiedTxId: ?string = "";
    if (tx.tx.txid) {
      foundOldUncormiedTxId = _.find(unconfirmedTxIds, (txId: string): boolean => txId === tx.tx.txid);
    }
    if (tx.timestamp > txTimestamp && !foundOldUncormiedTxId) {
      count++;
    }
  });

  return count > 0 ? count : null;
};

export const getLastTxTimestamp = (amountState: AmountState, address: string): number => {
  const lastTransactions: Array<LastTransaction> = mapTransactions(amountState, address);
  const lastestTx: LastTransaction = _.maxBy(lastTransactions, (tx: LastTransaction): number => {
    return tx.timestamp;
  });

  return lastestTx.timestamp;
};

export const getUnconfirmedTxsIds = (amountState: AmountState, address: string): Array<string> => {
  const transactions: Array<LastTransaction> = mapTransactions(amountState, address);
  const unconfirmedTxs: Array<Object> = _.filter(transactions, (tx: LastTransaction): boolean => {
    return tx.tx.confirmations === 0;
  });
  const unconfirmedTxsIds: Array<string> = [];
  unconfirmedTxs.forEach((tx: Object) => {
    unconfirmedTxsIds.push(tx.tx.txid);
  });

  return unconfirmedTxsIds;
};

export type AssetsTransaction = {
  premappedTx: LastTransaction,
  description: ?string,
  from: string,
  to: string
};

export const findDescriptionInTx = (tx: Object): string => {
  const tempVout: ?Object = _.find(tx.vout, (vout: Object): boolean => {
    return +vout.value === 0 && vout.scriptPubKey.asm && vout.scriptPubKey.asm.startsWith("OP_RETURN");
  });
  const hex: string = tempVout ? tempVout.scriptPubKey.hex : "";
  return tempVout && hex ? (CryptoJS.enc.Hex.parse(hex.slice(4))).toString(CryptoJS.enc.Utf8) : "";
};

const mapAssetsQtumTransactions = (premappedTxs: Array<LastTransaction>, address: string): Array<AssetsTransaction> => {
  const mappedTransactions: Array<AssetsTransaction> = [];
  premappedTxs.forEach((tx: LastTransaction) => {
    const assetsTx: AssetsTransaction = {
      premappedTx: tx,
      description: findDescriptionInTx(tx.tx),
      from: "",
      to: ""
    };
    if (tx.isIn) {
      assetsTx.to = MY_WALLET_LABEL;
      assetsTx.from = tx.tx.vin[0].addr ? tx.tx.vin[0].addr : "";
    } else {
      assetsTx.from = MY_WALLET_LABEL;
      const tempVout: ?Object = _.find(tx.tx.vout, (vout: Object): boolean => {
        return +vout.value > 0 && vout.scriptPubKey.addresses && vout.scriptPubKey.addresses[0] !== address;
      });
      if (tempVout) {
        assetsTx.to = tempVout.scriptPubKey.addresses[0];
      }
    }
    mappedTransactions.push(assetsTx);
  });

  return mappedTransactions;
};


const mapAssetsTokenTransactions = (premappedTxs: Array<LastTransaction>, address: string): Array<AssetsTransaction> => {
  const mappedTransactions: Array<AssetsTransaction> = [];
  premappedTxs.forEach((tx: LastTransaction) => {
    const assetsTx: AssetsTransaction = {
      premappedTx: tx,
      description: null,
      from: "",
      to: ""
    };
    if (tx.isIn) {
      assetsTx.to = MY_WALLET_LABEL;
      assetsTx.from = tx.tx.from;
    } else {
      assetsTx.from = MY_WALLET_LABEL;
      assetsTx.to = tx.tx.to;
    }
    mappedTransactions.push(assetsTx);
  });

  return mappedTransactions;
};

export const mapAssetsTransactions = (walletState: AmountState, currency: string, address: string): Array<AssetsTransaction> => {
  if (currency === SUPPORTED_CURRENCIES.QTUM) {
    const premappedTxs: Array<LastTransaction> = mapQtumTransactions(currency, address, walletState.QTUM.txs);
    return mapAssetsQtumTransactions(premappedTxs, address);
  } else {
    const premappedTxs: Array<LastTransaction> = mapTokensTransactions(currency, address, walletState.INK.txs);
    return mapAssetsTokenTransactions(premappedTxs, address);
  }
};

export const mergeTokensDescriptions = (walletState: AmountState, currency: string, txs: Array<AssetsTransaction>): Array<AssetsTransaction> => {
  if (currency === SUPPORTED_CURRENCIES.QTUM) {
    return txs;
  }
  const descs: Array<TokenDesc> = walletState.INK.tokenDescs;
  descs.forEach((desc: TokenDesc) => {
   const tx: ?AssetsTransaction =  _.find(txs, (assetsTransaction: AssetsTransaction): boolean => {
     return assetsTransaction.premappedTx.tx.tx_hash === desc.txId;
    });
    if (tx) {
      tx.description = desc.desc;
    }
  });

  return txs;
};
