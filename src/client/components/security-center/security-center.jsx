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
import {DEFAULT_EXPLORERS_PATHS} from "../../types/consts";
import {setExplorerUrl} from "../../actions/config-actions";

type Props = {
  dispatch: Dispatch,
  password: string,
  salt: string,
  passwordHash: string,
  seed: Uint8Array,
  derivePath: string,
  mnemonic: Mnemonic,
  explorerPath: string
};

type SecurityCenterState = {
  selectedExplorerOption: string,
  customExplorerPath: string,
  isInputPlaceHolderShown: boolean
};

const CUSTOM_EXPLORER_KEY: string = "custom";

class SecurityCenter extends React.Component<Props, SecurityCenterState> {
  successImage: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);
    (this: any).handleClickDownload = this.handleClickDownload.bind(this);
    (this: any).handlePasswordInput = this.handlePasswordInput.bind(this);
    (this: any).handleClickShow = this.handleClickShow.bind(this);
    (this: any).handlePathChange = this.handlePathChange.bind(this);
    (this: any).handleCustomPathInput = this.handleCustomPathInput.bind(this);
    (this: any).isCustom = this.isCustom.bind(this);
    (this: any).handleInputOnBlur = this.handleInputOnBlur.bind(this);
    (this: any).handleInputOnFocus = this.handleInputOnFocus.bind(this);
    (this: any).handleApplyCustomPath = this.handleApplyCustomPath.bind(this);
    this.successImage = preloadImage(successLogo);
    let explorerPath: string = props.explorerPath;
    if (explorerPath.endsWith("insight-api")) {
      explorerPath = explorerPath.slice(0, -("insight-api".length));
    }
    let customExplorerPath: string = "";
    if (explorerPath !== DEFAULT_EXPLORERS_PATHS.QTUM
      && explorerPath !== DEFAULT_EXPLORERS_PATHS.INK) {
      customExplorerPath = explorerPath;
    }
    this.state = {
      selectedExplorerOption: explorerPath,
      customExplorerPath,
      isInputPlaceHolderShown: customExplorerPath.length === 0
    };
  }

  handleCustomPathInput(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({customExplorerPath: e.currentTarget.value});
  }

  handleApplyCustomPath() {
    if (this.isCustom()) {
      let customExplorerPath = this.state.customExplorerPath;
      if (!customExplorerPath.endsWith("/")) {
        customExplorerPath += "/";
      }
      this.props.dispatch(setExplorerUrl(customExplorerPath));
    }
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

  handlePathChange(e: SyntheticInputEvent<HTMLInputElement>) {
    const newExplorerPath: string = e.currentTarget.value;
    if (CUSTOM_EXPLORER_KEY !== newExplorerPath) {
      this.props.dispatch(setExplorerUrl(newExplorerPath));
    }
    this.setState({selectedExplorerOption: newExplorerPath});
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

  isCustom(): boolean {
    return this.state.selectedExplorerOption !== DEFAULT_EXPLORERS_PATHS.QTUM
      && this.state.selectedExplorerOption !== DEFAULT_EXPLORERS_PATHS.INK;
  }

  handleInputOnBlur() {
    this.setState({isInputPlaceHolderShown: true});
  }

  handleInputOnFocus() {
    this.setState({isInputPlaceHolderShown: false});
  }

  render(): React.Node {
    return (
      <div className="security-center">
        <Col className="page-heading-wrapper" xs={10}>
          <div className="page-heading-container">
            <Translate value="securityCenter.pageHeading"/>
          </div>
        </Col>
        <Col xs={5} className="page-wrapper">
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
                         className="input center-input blue"/>
                </div>
                <div className="button-block">
                  <a onClick={this.handleClickShow} className="primary-red-btn">
                    <Translate value="securityCenter.displayBtn"/>
                  </a>
                  <a ref="downloadBtn" onClick={this.handleClickDownload} download="inkwallet.backup"
                     className="primary-red-btn">
                    <Translate value="securityCenter.downloadBackupBtn"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={5} className="page-wrapper">
          <div className="page-container">
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
        <Col xs={10} className="explorer-block-divider"/>
        <Col xs={5} className="page-wrapper">
          <div className="page-container">
            <div className="heading-title">
              <Translate value="securityCenter.explorerContainer.title"/>
            </div>
            <div className="form-wrapper explorer-path-container">
              <div className="form-container">
                <div className="column-wrapper path-radio-wrapper">
                  <input
                    className="radio"
                    name="isQtum"
                    type="radio"
                    value={DEFAULT_EXPLORERS_PATHS.QTUM}
                    id="is-qtum"
                    onChange={this.handlePathChange}
                    checked={this.state.selectedExplorerOption === DEFAULT_EXPLORERS_PATHS.QTUM}
                  />
                  <label htmlFor="is-qtum">
                    <div className="radio-label">
                      {DEFAULT_EXPLORERS_PATHS.QTUM}
                    </div>
                  </label>
                </div>
                <div className="column-wrapper path-radio-wrapper">
                  <input
                    className="radio"
                    name="isInk"
                    type="radio"
                    value={DEFAULT_EXPLORERS_PATHS.INK}
                    id="is-ink"
                    onChange={this.handlePathChange}
                    checked={this.state.selectedExplorerOption === DEFAULT_EXPLORERS_PATHS.INK}
                  />
                  <label htmlFor="is-ink">
                    <div className="radio-label">
                      {DEFAULT_EXPLORERS_PATHS.INK}
                    </div>
                  </label>
                </div>
                <div className="column-wrapper path-radio-wrapper custom-path-input-block">
                  <input
                    className="radio"
                    name="isCustom"
                    type="radio"
                    value={CUSTOM_EXPLORER_KEY}
                    id="is-custom"
                    onChange={this.handlePathChange}
                    checked={this.isCustom()}
                  />
                  <label htmlFor="is-custom">
                    <div className="radio-label">
                      <Translate value="securityCenter.explorerContainer.customRadioLabel"/>
                    </div>
                  </label>
                </div>
                <div className="form-wrapper">
                  <div className="form-container">
                    <div className="custom-path-input" style={{position: "relative"}}>
                      <input type="text" onChange={this.handleCustomPathInput}
                             onBlur={this.handleInputOnBlur}
                             onFocus={this.handleInputOnFocus}
                             value={this.state.customExplorerPath}
                             className={`input blue ${!this.isCustom() ? "disabled" : ""}`} disabled={!this.isCustom()}/>
                      {/* TODO Withdraw input with placehodler in separate component */}
                      {(this.state.isInputPlaceHolderShown && this.state.customExplorerPath.length === 0)
                      && <span className="path-input-placeholder">
                        <Translate value="securityCenter.explorerContainer.customPathInputPlaceholder"/>
                      </span>}
                    </div>
                    <div className="button-block submit">
                      <a onClick={this.handleApplyCustomPath}
                         className={`primary-red-btn ${!this.isCustom() ? "disabled" : ""}`}>
                        <Translate value="securityCenter.explorerContainer.submitBtn"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={5} className="page-wrapper">
          <div className="page-container">
            <div className="desc-block">
              <div className="desc">
                <Translate value="securityCenter.explorerContainer.desc"/>
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
    mnemonic: state.loginState.mnemonic,
    explorerPath: state.config.qtumExplorerPath
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(SecurityCenter);
