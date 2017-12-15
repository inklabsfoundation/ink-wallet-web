/* eslint-disable no-undef */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
import Mnemonic from "bitcore-mnemonic";
// $FlowFixMe
import {connect} from "react-redux";
import successLogo from "../../../images/success.png";

type Props = {
  dispatch: Dispatch,
  mnemonic: Mnemonic
}

class RestoreSuccess extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(): void {
  }

  render() {
    return (
      <div>
        <div className="create-title-panel reset">
          <div className="success-logo">
            <img src={successLogo}/>
          </div>
          <div className="create-title">
            <Translate value="restoreWallet.restoreSuccessTitle"/>
          </div>
        </div>
        <div className="create-desc-panel">
          <div className="create-desc reset">
            <Translate value="restoreWallet.restoreInfo.info1"/>
          </div>
          <div className="create-desc reset">
            <Translate value="restoreWallet.restoreInfo.info2"/>
          </div>
          <div className="create-desc reset">
            <Translate value="restoreWallet.restoreInfo.info3"/>
          </div>
        </div>
        <div className="show-mnemonics-btn-panel">
          <a className="primary-red-btn">
            <Translate value="createWallet.showMnemonicDownloadBtn"/>
          </a>
          <a className="primary-white-btn bordered">
            <Translate value="createWallet.showMnemonicNextBtn"/>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    mnemonic: state.creationState.mnemonic
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(RestoreSuccess);
