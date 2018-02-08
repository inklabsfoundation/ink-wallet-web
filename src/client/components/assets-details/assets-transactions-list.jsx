// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import type {AmountState, State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Address} from "@evercode-lab/qtumcore-lib/index";
import {mapAssetsTransactions, mergeTokensDescriptions, MY_WALLET_LABEL} from "../../services/transaction-mapper";
import type {AssetsTransaction} from "../../services/transaction-mapper";
import {ASSETS_DETAILS_TABS} from "./assets-transactions-panel";
import * as _ from "lodash";
import moment from "moment";
import {SUPPORTED_CURRENCIES} from "../../initial-state";
import {requestTokensDesc} from "../../actions/amount-actions";
import {MILLISECONDS_OFFSET} from "../../types/consts";

type Props = {
  dispatch: Dispatch,
  tab: string,
  amountState: AmountState,
  routeParams: Object,
  address: Address,
  startDate: ?moment,
  endDate: ?moment
};

class AssetsTransactionsList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).mapAssetsTxs = this.mapAssetsTxs.bind(this);
    (this: any).isToken = this.isToken.bind(this);
    (this: any).handleClickShowDescription = this.handleClickShowDescription.bind(this);
  }

  mapAssetsTxs(): Array<AssetsTransaction> {
    const currency = this.props.routeParams.currency;
    let txs: Array<AssetsTransaction> = mapAssetsTransactions(this.props.amountState, currency, this.props.address.toString());
    switch (this.props.tab) {
      case ASSETS_DETAILS_TABS.RECEIVED:
        txs = _.filter(txs, (tx: AssetsTransaction): boolean => {
          return tx.premappedTx.isIn;
        });
        break;
      case ASSETS_DETAILS_TABS.SEND:
        txs = _.filter(txs, (tx: AssetsTransaction): boolean => {
          return !tx.premappedTx.isIn;
        });
        break;
    }
    if (this.isToken()) {
      txs = mergeTokensDescriptions(this.props.amountState, currency, txs);
    }
    if (this.props.startDate) {
      txs = _.filter(txs, (tx: AssetsTransaction): boolean => {
        return tx.premappedTx.timestamp >= (+this.props.startDate / MILLISECONDS_OFFSET);
      });
    }
    if (this.props.endDate) {
      txs = _.filter(txs, (tx: AssetsTransaction): boolean => {
        return tx.premappedTx.timestamp <= (+this.props.endDate / MILLISECONDS_OFFSET);
      });
    }

    return txs;
  }

  isToken(): boolean {
    return this.props.routeParams.currency !== SUPPORTED_CURRENCIES.QTUM;
  }

  handleClickShowDescription(txId: string) {
    this.props.dispatch(requestTokensDesc(txId, this.props.routeParams.currency));
  }

  render(): React.Node {
    const txs: Array<AssetsTransaction> = this.mapAssetsTxs();
    const assetsTransactionList: Array<React.Node> = txs.map((tx: AssetsTransaction, indx: number): React.Node => {
      return (
        <div className="assets-details-tx" key={indx}>
          <div className="assets-details-tx-data small">
            <div className="direction">
              {tx.premappedTx.isIn ? <Translate value="assetsDetails.sendLabel"/> :
                <Translate value="assetsDetails.receivedLabel"/>}
            </div>
            <div className="date">
              {moment.unix(tx.premappedTx.timestamp).format("YYYY.MM.DD HH:mm:ss")}
            </div>
          </div>
          <div className="assets-details-tx-data big">
            <div className="from">
              <div className="address-label"><Translate value="assetsDetails.fromLabel"/></div>
              <span className="address-data">{tx.from === MY_WALLET_LABEL ?
                <Translate value="assetsDetails.myWalletLabel"/> : tx.from}</span>
            </div>
            <div className="to">
              <div className="address-label"><Translate value="assetsDetails.toLabel"/></div>
              <span className="address-data">{tx.to === MY_WALLET_LABEL ?
                <Translate value="assetsDetails.myWalletLabel"/> : tx.to}</span>
            </div>
          </div>
          <div className="assets-details-tx-data big">
            <div className="description">
              <span className="address-label"><Translate value="assetsDetails.descLabel"/></span>
              <span className="address-data">
                {_.isNull(tx.description)
                  ? <a onClick={() => {this.handleClickShowDescription(tx.premappedTx.tx.tx_hash);}}>Show description</a>
                : tx.description}
                </span>
            </div>
          </div>
          <div className="assets-details-tx-data">
            <div className="amount-container">
              <div className={`amount-inner ${tx.premappedTx.isIn ? "in-tx" : "out-tx"}`}>
                {+tx.premappedTx.value}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="assets-transactions-list">
        {assetsTransactionList.length
          ? assetsTransactionList
          : <div className="not-found">
            Transactions not found
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    blockHeight: state.loginState.blockHeight,
    amountState: state.amountState,
    address: state.loginState.address
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsTransactionsList);
