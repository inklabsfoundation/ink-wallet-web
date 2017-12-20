/* eslint-disable no-undef */
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

type Props = {
  dispatch: Dispatch,
  mnemonic: Mnemonic,
  seed: Uint8Array,
  password: string
}

class ShowMnemonics extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(): void {
    this.props.dispatch(tryToLogin(
      this.props.seed,
      this.props.password
    ));
  }

  render() {
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
          <a className="primary-red-btn">
            <Translate value="createWallet.showMnemonicDownloadBtn"/>
          </a>
          <Link to={ROUTE_URLS.MAIN_PAGE}
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
    seed: state.creationState.seed
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(ShowMnemonics);
