// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import PasswordErrorModal from "./error-modal";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {openErrorModal, openMnemonicModal, setPasswordSecurity} from "../../actions/security-center-actions";
import CryptoHandler from "../../services/crypto-handler";
import {preloadImage} from "../../services/image-preloader";
import successLogo from "../../images/success.png";
import MnemonicModal from "./mnemonics-modal";
import Mnemonic from "bitcore-mnemonic";

type Props = {
  dispatch: Dispatch,
  password: string,
  salt: string,
  passwordHash: string,
  seed: Uint8Array,
  derivePath: string,
  mnemonic: Mnemonic
}

class SecurityCenter extends React.Component<Props> {
  successImage: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);
    (this: any).handleClickDownload = this.handleClickDownload.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleClickShow = this.handleClickShow.bind(this);
    this.successImage = preloadImage(successLogo);
  }

  handleClickDownload(e: SyntheticInputEvent<HTMLButtonElement>) {
    if (!CryptoHandler.isPasswordCorrect(this.props.passwordHash, this.props.password, this.props.salt)) {
      e.preventDefault();
      this.refs.downloadBtn.href = "";
      this.props.dispatch(openErrorModal());
    } else {
      this.refs.downloadBtn.href = CryptoHandler.generateBackupFile(this.props.derivePath, this.props.password, this.props.mnemonic);
    }
  }

  handleClickShow(e: SyntheticInputEvent<HTMLButtonElement>) {
    if (!CryptoHandler.isPasswordCorrect(this.props.passwordHash, this.props.password, this.props.salt)) {
      e.preventDefault();
      this.props.dispatch(openErrorModal());
    } else {
      this.props.dispatch(openMnemonicModal());
    }
  }

  handlePasswordInput(e: SyntheticInputEvent<HTMLInputElement>) {
    this.props.dispatch(setPasswordSecurity(e.currentTarget.value));
    if (!CryptoHandler.isPasswordCorrect(this.props.passwordHash, e.currentTarget.value, this.props.salt)) {
      this.refs.downloadBtn.href = "";
    }
  }

  render() {
    return (
      <div className="security-center">
        <Col className="page-heading-wrapper" xs={10}>
          <div className="page-heading-container">
            <Translate value="securityCenter.pageHeading"/>
          </div>
        </Col>
        <Col xs={10} className="page-wrapper">
          <div className="page-container">
            <div className="heading-title">
              <Translate value="securityCenter.panelHeading"/>
            </div>
            <div className="heading-subtitle">
              <Translate value="securityCenter.panelSubHeading"/>
            </div>
            <div className="form-wrapper">
              <div className="form-container">
                <div className="password-input-block">
                  <input type="password" onChange={this.handlePasswordInput}
                         className="input center-input"/>
                </div>
                <div className="button-block">
                  <a onClick={this.handleClickShow} className="primary-red-btn">
                    <Translate value="securityCenter.displayBtn"/>
                  </a>
                  <a ref="downloadBtn" onClick={this.handleClickDownload} download="inkwallet.backup" className="primary-red-btn">
                    <Translate value="securityCenter.downloadBackupBtn"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="desc-block">
              <div className="desc">
                <Translate value="securityCenter.firstDescription"/>
              </div>
              <div className="desc">
                <Translate value="securityCenter.secondDescription"/>
              </div>
              <div className="desc">
                <Translate value="securityCenter.thirdDescription"/>
              </div>
              <div className="desc">
                <Translate value="securityCenter.forthDescription"/>
              </div>
            </div>
          </div>
        </Col>
        <PasswordErrorModal/>
        <MnemonicModal img={this.successImage}/>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    password: state.securityCenterState.inputPassword,
    passwordHash: state.loginState.passwordHash,
    salt: state.config.encryptSalt,
    seed: state.loginState.seed,
    derivePath: state.config.derivePath,
    mnemonic: state.loginState.mnemonic
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(SecurityCenter);
