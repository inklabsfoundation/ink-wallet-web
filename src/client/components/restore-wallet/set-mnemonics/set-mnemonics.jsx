/* eslint-disable no-undef */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
import alertNoticeIcon from "../../../images/alert-notice.png";
// $FlowFixMe
import {connect} from "react-redux";
import {
  setInputMnemonic, tryToCommitMnemonic,
} from "../../../actions/creation-actions";
import {ROUTE_URLS} from "../../../routes";
// $FlowFixMe
import {Link} from "react-router";

type Props = {
  dispatch: Dispatch,
  inputMnemonics: string,
  isInputMnemonicValid: boolean,
  isInputMnemonicEmpty: boolean
}

class SetMnemonics extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).checkError = this.checkError.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handlePasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(setInputMnemonic(e.currentTarget.value));
  }

  checkError(): string {
    return (!this.props.isInputMnemonicValid || this.props.isInputMnemonicEmpty ? " error" : "");
  }

  handleClickNext(): void {
    this.props.dispatch(tryToCommitMnemonic());
  }

  render() {
    return (
      <div>
        <div className="mnemonics-panel">
          <div className="mnemonics-label">
            <Translate value="restoreWallet.inputYourMnemonics"/>
          </div>
          <div className="password-input-block">
            <input type="text" onChange={this.handlePasswordInput}
                   className={`input-mnemonic ${  this.checkError()}`}/>
          </div>
          <div className="error-message-block">
            {!this.props.isInputMnemonicValid
              ? <div className="error-message">
                <Translate value="restoreWallet.errors.invalid"/>
              </div>
              : ""}
            {this.props.isInputMnemonicEmpty
              ? <div className="error-message">
                <Translate value="restoreWallet.errors.notEntered"/>
              </div>
              : ""}
          </div>
        </div>
        <div className="create-btn-panel">
          <a onClick={this.handleClickNext}
             className="primary-red-btn">
            <Translate value="createWallet.passwordNextBtn"/>
          </a>
          <Link to={ROUTE_URLS.MAIN_PAGE} className="primary-white-btn">
            <Translate value="createWallet.goToMainPageBtn"/>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isInputMnemonicEmpty: state.creationState.isInputMnemonicEmpty,
    isInputMnemonicValid: state.creationState.isInputMnemonicValid
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(SetMnemonics);
