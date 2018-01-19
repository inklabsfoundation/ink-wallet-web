// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
import Mnemonic from "bitcore-mnemonic";
// $FlowFixMe
import {connect} from "react-redux";
import {ROUTE_URLS} from "../../../routes";
// $FlowFixMe
import {Link} from "react-router";
import {tryToLogin} from "../../../actions/login-actions";
import CryptoHandler from "../../../services/crypto-handler";

type Props = {
  dispatch: Dispatch,
  mnemonic: Mnemonic,
  seed: Uint8Array,
  password: string,
  derivePath: string
};

class ShowMnemonics extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext() {
    this.props.dispatch(tryToLogin(
      this.props.seed,
      this.props.password,
      this.props.mnemonic
    ));
  }

  render(): React.Node {
    const backupDataStr = CryptoHandler.generateBackupFile(
      this.props.derivePath,
      this.props.password,
      this.props.mnemonic
    );
    return (
      <div>
        <div className="progress-panel">
          <div className="progress-bar-first-step"/>
          <div className="progress-bar-second-step"/>
          <div className="progress-bar-third-step"/>
        </div>
        <div className="create-title-panel">
          <div className="create-title">
            <Translate value="createWallet.showMnemonicTitle"/>
          </div>
        </div>
        <div className="create-data-panel">
          <div className="create-data">
            {this.props.mnemonic.toString()}
          </div>
        </div>
        <div className="create-desc-panel">
          <div className="create-desc">
            <Translate value="createWallet.showMnemonicDescr"/>
          </div>
        </div>
        <div className="show-mnemonics-btn-panel">
          <a className="primary-red-btn" href={backupDataStr} download="inkwallet.backup">
            <Translate value="createWallet.showMnemonicDownloadBtn"/>
          </a>
          <Link to={ROUTE_URLS.WALLET_PAGE}
                onClick={this.handleClickNext} className="primary-white-btn bordered">
            <Translate value="createWallet.showMnemonicNextBtn"/>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    mnemonic: state.creationState.mnemonic,
    password: state.creationState.password,
    seed: state.creationState.seed,
    derivePath: state.config.derivePath
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(ShowMnemonics);
