// @flow
import * as React from "react";
import type {State, WalletAmount} from "../../../../initial-state";
import type {Dispatch} from "../../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import {Address} from "qtumcore-lib";
import inkIcon28 from "../../../../images/ink-icon-28.png";
import copyIcon from "../../../../images/copy-icon.png";
// $FlowFixMe
import CopyToClipboard from "react-copy-to-clipboard";
import {Translate} from "react-redux-i18n";

type Props = {
  qtumAmount: WalletAmount;
  address: Address
}

class AmountPanel extends React.Component<Props> {
  render() {
    return (
      <Col className="amount-panel" xs={12}>
        <div className="amount-title-block">
          <div className="currency-name">INK</div>
          <div className="currency-icon">
            <img src={inkIcon28}/>
          </div>
        </div>
        <div className="amount-value">
          0.00
        </div>
        <div className="amount-address">
          <div className="amount-address-icon">
            <CopyToClipboard text="QPssAYA8MjQSdeKSYfbqsYAafx5nXAmXgQ">
              <img src={copyIcon}/>
            </CopyToClipboard>
          </div>
          <div className="amount-address-value">QPssAYA8MjQSdeKSYfbqsYAafx5nXAmXgQ</div>
        </div>
        <div className="amount-btn-panel">
          <a className="primary-red-btn amount-btn">
            <Translate value="mainPage.sendBtn"/>
          </a>
          <a className="primary-white-btn bordered amount-btn">
            <Translate value="mainPage.receiveBtn"/>
          </a>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    qtumAmount: state.amountState.QTUM,
    address: state.loginState.address
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(AmountPanel);
