// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
import alertNoticeIcon from "../../../images/alert-notice.png";
// $FlowFixMe
import {connect} from "react-redux";
import {
  setAgreed, setInputPassword, setInputRepeatPassword,
  tryToCommitPasswords
} from "../../../actions/creation-actions";
import {ROUTE_URLS} from "../../../routes";
// $FlowFixMe
import {Link} from "react-router";

type Props = {
  dispatch: Dispatch,
  repeatInputPassword: string,
  inputPassword: string,
  arePasswordsValid: boolean,
  areInputPasswordsEqual: boolean,
  isAgreed: boolean
}

class SetPassword extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).checkError = this.checkError.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleRepeatPasswordInput = this.handleRepeatPasswordInput.bind(this);
    (this: any).handleAgreedClick = this.handleAgreedClick.bind(this);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handlePasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(setInputPassword(e.currentTarget.value));
  }

  handleRepeatPasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(setInputRepeatPassword(e.currentTarget.value));
  }

  handleAgreedClick(): void {
    this.props.dispatch(setAgreed(!this.props.isAgreed));
  }

  checkError(): string {
    return (this.props.areInputPasswordsEqual && this.props.arePasswordsValid ? "" : " error");
  }

  handleClickNext(): void {
    if (this.props.isAgreed) {
      this.props.dispatch(tryToCommitPasswords());
    }
  }

  render() {
    return (
      <div>
        <div className="progress-panel">
          <div className="progress-bar-first-step"/>
          <div className="progress-bar-undone"/>
          <div className="progress-bar-undone"/>
        </div>
        <div className="password-panel">
          <div className="password-label">
            <Translate value="createWallet.setPassword"/>
          </div>
          <div className="password-input-block">
            <input type="password" onChange={this.handlePasswordInput}
                   className={`input${  this.checkError()}`}/>
          </div>
          <div className="password-label">
            <Translate value="createWallet.confirmPassword"/>
          </div>
          <div className="password-input-block">
            <input type="password" onChange={this.handleRepeatPasswordInput}
                   className={`input${  this.checkError()}`}/>
          </div>
          <div className="error-message-block">
            {!this.props.areInputPasswordsEqual &&
              <div className="error-message">
                <Translate value="createWallet.errors.notMatch"/>
              </div>
            }
            {this.props.arePasswordsValid &&
              <div className="error-message">
                <Translate value="createWallet.errors.notEntered"/>
              </div>
             }
          </div>
        </div>
        <div className="info-block-panel">
          <div className="alert-info-pic-block">
            <img src={alertNoticeIcon}/>
          </div>
          <div className="info-block">
            <Translate value="createWallet.passwordInfo1"/>
            <br/>
            <Translate value="createWallet.passwordInfo2"/>
          </div>
        </div>
        <div className="agree-panel">
          <label className="control control-checkbox">
            <Translate value="createWallet.agree"/>
            <input type="checkbox"
                   defaultChecked={this.props.isAgreed}
                   onChange={this.handleAgreedClick}/>
            <div className="control_indicator"/>
          </label>
        </div>
        <div className="create-btn-panel">
          <a onClick={this.handleClickNext}
             className={`primary-red-btn ${  !this.props.isAgreed ? "disabled" : ""}`}>
            <Translate value="createWallet.passwordNextBtn"/>
          </a>
          <Link to={ROUTE_URLS.HOME_PAGE} className="primary-white-btn">
            <Translate value="createWallet.goToMainPageBtn"/>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    arePasswordsValid: state.creationState.arePasswordsValid,
    areInputPasswordsEqual: state.creationState.areInputPasswordsEqual,
    isAgreed: state.creationState.isAgreed
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(SetPassword);
