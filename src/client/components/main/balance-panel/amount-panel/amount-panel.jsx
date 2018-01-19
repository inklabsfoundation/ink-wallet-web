// @flow
import * as React from "react";
import type {State, WalletAmount} from "../../../../initial-state";
import type {Dispatch} from "../../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import {Address} from "@evercode-lab/qtumcore-lib";
import inkIcon28 from "../../../../images/ink-icon-28.png";
import copyIcon from "../../../../images/copy-icon.png";
import CopyToClipboard from "react-copy-to-clipboard";
import {Translate} from "react-redux-i18n";
import {openModal} from "../../../../actions/sent-transaction-action";
import SendTransactionModal from "../../../send-transaction/sent-transaction-modal";
import ReceiveModal from "../../../receive/receive-modal";
import {openReceiveModal} from "../../../../actions/receive-actions";

type Props = {
  qtumAmount: WalletAmount,
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
            <img src={inkIcon28}/>
          </div>
        </div>
        <div className="amount-value">
          {this.props.inkAmount.balance}
        </div>
        <div className="amount-address">
          <div className="amount-address-icon">
            <CopyToClipboard text="QPssAYA8MjQSdeKSYfbqsYAafx5nXAmXgQ">
              <img src={copyIcon}/>
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
        <SendTransactionModal/>
        <ReceiveModal/>
      </Col>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    qtumAmount: state.amountState.QTUM,
    inkAmount: state.amountState.INK,
    address: state.loginState.address
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AmountPanel);
