// @flow
import * as React from "react";
import type {State, WalletAmount} from "../../../../initial-state";
import type {Dispatch} from "../../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import {Address} from "@evercode-lab/qtumcore-lib";
import inkIcon from "../../../../images/ink-icon.svg";
import copyIcon from "../../../../images/copy-icon.png";
import CopyToClipboard from "react-copy-to-clipboard";
import sendingIcon from "../../../../images/pendingicon.svg";
import {Translate} from "react-redux-i18n";
import {openModal} from "../../../../actions/sent-transaction-action";
import {openReceiveModal} from "../../../../actions/receive-actions";
import {valueFilter} from "../../../../services/amount-helper";

type Props = {
  inkAmount: WalletAmount,
  address: Address,
  dispatch: Dispatch
};

class AmountPanel extends React.Component<Props> {
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
    return (
      <Col className="amount-panel" xs={12}>
        <div className="amount-title-block">
          <div className="currency-name">INK</div>
          <div className="currency-icon">
            <img style={{width: "28px"}} src={inkIcon}/>
          </div>
        </div>
        <div className="amount-value">
          <div>{valueFilter(this.props.inkAmount.balance)}</div>
          {this.props.inkAmount.isTokenTxPending && <div className="pending"><img src={sendingIcon}/></div>}
        </div>
        <div className="amount-address">
          <div className="amount-address-icon">
            <CopyToClipboard text={this.props.address.toString()}>
              <img width={18} height={18} src={copyIcon}/>
            </CopyToClipboard>
          </div>
          <div className="amount-address-value">{this.props.address.toString()}</div>
        </div>
        <div className="amount-btn-panel">
          <a onClick={this.handleClickSendTransaction} className="primary-red-btn amount-btn">
            <Translate value="mainPage.sendBtn"/>
          </a>
          <a onClick={this.handleClickReceive} className="primary-white-btn bordered amount-btn">
            <Translate value="mainPage.receiveBtn"/>
          </a>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    inkAmount: state.amountState.INK,
    address: state.loginState.address
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AmountPanel);
