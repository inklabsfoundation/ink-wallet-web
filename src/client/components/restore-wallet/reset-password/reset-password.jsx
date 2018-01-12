// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {
  setInputPassword, setInputRepeatPassword,
  tryToCommitResetPasswords
} from "../../../actions/creation-actions";

type Props = {
  dispatch: Dispatch,
  repeatInputPassword: string,
  inputPassword: string,
  arePasswordsValid: boolean,
  areInputPasswordsEqual: boolean
}

class ResetPassword extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).checkError = this.checkError.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleRepeatPasswordInput = this.handleRepeatPasswordInput.bind(this);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handlePasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(setInputPassword(e.currentTarget.value));
  }

  handleRepeatPasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(setInputRepeatPassword(e.currentTarget.value));
  }

  checkError(): string {
    return (this.props.areInputPasswordsEqual && this.props.arePasswordsValid ? "" : " error");
  }

  handleClickNext(): void {
    this.props.dispatch(tryToCommitResetPasswords());
  }

  render() {
    return (
      <div>
        <div className="password-panel reset">
          <div className="password-label reset">
            <Translate value="restoreWallet.resetPassword"/>
          </div>
          <div className="password-input-block reset">
            <input type="password" onChange={this.handlePasswordInput}
                   className={`input${  this.checkError()}`}/>
          </div>
          <div className="password-label reset">
            <Translate value="createWallet.confirmPassword"/>
          </div>
          <div className="password-input-block reset">
            <input type="password" onChange={this.handleRepeatPasswordInput}
                   className={`input${  this.checkError()}`}/>
          </div>
          <div className="error-message-block">
            {!this.props.areInputPasswordsEqual &&
              <div className="error-message">
                <Translate value="createWallet.errors.notMatch"/>
              </div>
            }
            {!this.props.arePasswordsValid &&
              <div className="error-message">
                <Translate value="createWallet.errors.notEntered"/>
              </div>
            }
          </div>
        </div>
        <div className="info-block-panel reset">
          <div className="info-reset-password-block">
            <Translate value="restoreWallet.passwordInfo"/>
          </div>
        </div>
        <div className="create-btn-panel">
          <a onClick={this.handleClickNext}
             className="primary-red-btn">
            <Translate value="createWallet.passwordNextBtn"/>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    arePasswordsValid: state.creationState.arePasswordsValid,
    areInputPasswordsEqual: state.creationState.areInputPasswordsEqual
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(ResetPassword);
