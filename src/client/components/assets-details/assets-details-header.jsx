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
import {calculatePendingAmount} from "../../services/amount-helper";
import {Address} from "@evercode-lab/qtumcore-lib/index";

type Props = {
  dispatch: Dispatch,
  routeParams: Object,
  blockHeight: number,
  amountState: WalletAmount,
  height: number,
  address: Address
};

const BALANCE_FRACTION_DIGITS: number = 6;

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
    let pendingAmount: number = 0;
    let availableAmount: number = 0;
    if (this.props.amountState.hasOwnProperty(this.props.routeParams.currency)) {
      currencyKey = this.props.routeParams.currency;
      currencyState = this.props.amountState[this.props.routeParams.currency];
      pendingAmount = calculatePendingAmount(currencyKey, currencyState, this.props.height, this.props.address.toString());
      availableAmount = currencyState.balance - pendingAmount;
    }
    return (
      <div>
        <Col className="summary-info-panel" xs={6}>
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
              {currencyState && currencyState.balance}
            </div>
            <div className="currency-available-amount">
              <Translate value="assetsDetails.amountLabel"/> {availableAmount.toFixed(BALANCE_FRACTION_DIGITS)}
            </div>
            <div className="currency-pending-amount">
              <Translate value="assetsDetails.pendingLabel"/> {pendingAmount.toFixed(BALANCE_FRACTION_DIGITS)}
            </div>
          </div>
        </Col>
        <Col className="btn-panel" xs={6}>
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
    address: state.loginState.address
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsDetailsHeader);
