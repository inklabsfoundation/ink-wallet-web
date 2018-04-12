// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import type {State, WalletAmount} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {openModal} from "../../actions/sent-transaction-action";
import {openReceiveModal} from "../../actions/receive-actions";
import CurrencyIcon from "../common/currency-icon";
import {calculatePendingAmount, valueFilter} from "../../services/amount-helper";
import type {Amount} from "../../services/amount-helper";
import {Address} from "@evercode-lab/qtumcore-lib/index";
import type {AmountState} from "../../initial-state";
import {SUPPORTED_CURRENCIES} from "../../initial-state";

type Props = {
  dispatch: Dispatch,
  routeParams: Object,
  blockHeight: number,
  amountState: AmountState,
  height: number,
  address: Address,
  stakingBalance: number
};

class AssetsDetailsHeader extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClickSendTransaction = this.handleClickSendTransaction.bind(this);
    (this: any).handleClickReceive = this.handleClickReceive.bind(this);
  }

  handleClickSendTransaction() {
    this.props.dispatch(openModal());
  }

  handleClickReceive() {
    this.props.dispatch(openReceiveModal());
  }

  render(): React.Node {
    let currencyKey: string = "";
    let currencyState: ?WalletAmount;
    let pendingAmount: Amount = {
      inValue: 0,
      outValue: 0
    };
    let availableAmount: number = 0;
    if (this.props.amountState.hasOwnProperty(this.props.routeParams.currency)) {
      currencyKey = this.props.routeParams.currency;
      currencyState = this.props.amountState[currencyKey];
      pendingAmount = calculatePendingAmount(currencyKey, currencyState, this.props.height, this.props.address.toString());
      availableAmount = currencyState.balance - pendingAmount.outValue;
    }
    if (this.props.routeParams.currency === SUPPORTED_CURRENCIES.QTUM) {
      availableAmount -= this.props.stakingBalance;
    }
    const inPendingValue: string = (pendingAmount.inValue > 0) ? `+${valueFilter(pendingAmount.inValue)} QTUM` : "";
    const outPendingValue: string = (pendingAmount.outValue > 0) ? `-${valueFilter(pendingAmount.outValue)} QTUM` : "";
    const pendingDevider: string  = (outPendingValue && inPendingValue) ? "/ " : "";
    const pendingLabel: React.Node = (
      <div>
      <Translate value="assetsDetails.pendingLabel"/>
      {(pendingAmount.inValue === 0 && pendingAmount.outValue === 0) ? " 0" :
        ` ${inPendingValue}${pendingDevider}${outPendingValue}`
      }
      </div>
    );
    const stakingLabel: React.Node = (
        <div>
        <Translate value="assetsDetails.stakingLabel"/>
          {(this.props.stakingBalance === 0) ? " 0" :
            ` ${valueFilter(this.props.stakingBalance)}`
          }
        </div>
    );
    return (
      <div>
        <Col className="summary-info-panel" xs={9}>
          <div className="currecy-name-container">
            <div className="currency-logo">
              <CurrencyIcon small={false} currencyName={currencyKey}/>
            </div>
            <div className="currency-name">
              {currencyKey}
            </div>
          </div>
          <div className="currecy-data-container">
            <div className="currency-full-amount">
              {currencyState && valueFilter(currencyState.balance)}
            </div>
            <div className="currency-available-amount">
              <Translate value="assetsDetails.amountLabel"/> {valueFilter(availableAmount)}
            </div>
            <div className="currency-pending-amount">
              {pendingLabel}
            </div>
            <div className="currency-pending-amount">
              {this.props.routeParams.currency === SUPPORTED_CURRENCIES.QTUM && stakingLabel}
            </div>
          </div>
        </Col>
        <Col className="btn-panel" xs={3}>
          <div className="btn-container">
            <a onClick={this.handleClickSendTransaction} className="primary-red-btn amount-btn">
              <Translate value="mainPage.sendBtn"/>
            </a>
          </div>
          <div className="btn-container">
            <a onClick={this.handleClickReceive} className="primary-white-btn bordered amount-btn">
              <Translate value="mainPage.receiveBtn"/>
            </a>
          </div>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    blockHeight: state.loginState.blockHeight,
    amountState: state.amountState,
    height: state.loginState.blockHeight,
    address: state.loginState.address,
    stakingBalance: state.sendTransactionState.stakingBalance
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsDetailsHeader);
