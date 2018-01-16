// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
import {Address} from "@evercode-lab/qtumcore-lib";
// $FlowFixMe
import {connect} from "react-redux";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {Link} from "react-router";
import {attemptLogin, fileUpload, inputPassword} from "../../actions/login-actions";
import Dropzone from "react-dropzone";

type Props = {
  dispatch: Dispatch,
  invalidData: boolean,
  inputPassword: string,
  isFileUploaded: boolean,
  backupFile: File
}

class LoginForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).handleClickUpload = this.handleClickUpload.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleClickConfirm = this.handleClickConfirm.bind(this);
    (this: any).isConfirmable = this.isConfirmable.bind(this);
    (this: any).handleUpdateInputChange = this.handleUpdateInputChange.bind(this);
    (this: any).onDrop = this.onDrop.bind(this);
  }

  handleClickUpload(): void {
    this.refs.fileInput.click();
  }

  checkError(): string {
    return this.props.invalidData ? "error" : "";
  }

  handleUpdateInputChange(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(fileUpload(e.currentTarget.files[0]));
  }

  handlePasswordInput(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.props.dispatch(inputPassword(e.currentTarget.value));
  }

  handleClickConfirm(): void {
    if (this.isConfirmable()) {
      this.props.dispatch(attemptLogin(this.props.inputPassword, this.props.backupFile));
    }
  }

  isConfirmable(): boolean {
    return this.props.inputPassword.length > 0 && this.props.isFileUploaded;
  }

  onDrop(acceptedFiles: Array<File>, rejectedFiles: Array<File>): void {
    this.props.dispatch(fileUpload(acceptedFiles[0]));
  }

  render() {
    const invalidData: boolean = this.props.invalidData;
    const dropStyle = {
      width: "inherit",
      height: "inherit",
      borderWidth: 0,
      borderColor: "inherit",
      borderStyle: "inherit",
      borderRadius: 0
    };
    return (
      <div>
        <Dropzone style={dropStyle} onDrop={this.onDrop}>
          <div className="upload-container">
            <a className="primary-red-btn btn-flex">
              {this.props.isFileUploaded
                ? <Translate value="loginPage.uploadFileBtnUploaded"/>
                : <Translate value="loginPage.uploadFileBtn"/>
              }
            </a>
            <input className="file-input" ref="fileInput" onChange={this.handleUpdateInputChange}
                   type="file"/>
          </div>
        </Dropzone>
        <div className="login-password-panel">
          <div className="password-label">
            <Translate value="loginPage.inputPasswordLabel"/>
          </div>
          <div className="password-input-block">
            <input type="password" onChange={this.handlePasswordInput}
                   className={`input ${invalidData ? "error" : ""}`}/>
          </div>
          <div className="error-message-block">
            {invalidData &&
            <div className="error-message">
              <Translate value="loginPage.errors.loginError"/>
            </div>
            }
          </div>
        </div>
        <div className="confirm-container">
          <a onClick={this.handleClickConfirm}
             className={`primary-red-btn btn-flex ${this.isConfirmable() ? "" : "disabled"}`}>
            <Translate value="loginPage.confirmBtn"/>
          </a>
        </div>
        <div className="restore-link-container">
          <Link to={ROUTE_URLS.RESTORE_WALLET_PAGE}>
            <Translate value="loginPage.restoreLink"/>
          </Link>
        </div>
        <div className="restore-desc-link-container">
          <Translate value="loginPage.restoreDescLabel"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    inputPassword: state.loginState.inputPassword,
    invalidData: state.loginState.invalidData,
    isFileUploaded: state.loginState.isFileUploaded,
    backupFile: state.loginState.backupFile
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(LoginForm);
