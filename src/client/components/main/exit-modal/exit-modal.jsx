// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
// $FlowFixMe
import {CopyToClipboard} from "react-copy-to-clipboard";
import {closeExitModal, dontShowModal, showModal, tryToLogout} from "../../../actions/login-actions";
// $FlowFixMe
import {browserHistory} from "react-router";
import {ROUTE_URLS} from "../../../routes";
import {isClientSide} from "../../../services/is-client-side-helper";

type Props = {
  dispatch: Dispatch,
  isExitModalOpen: boolean,
  img: HTMLImageElement,
  isExit: boolean,
  intervalId: IntervalID,
  beforeUnload: ?Function,
  dontShowConfirmExit: boolean
};

class ExitModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleLogOut = this.handleLogOut.bind(this);
    (this: any).handleGoToSecureCenter = this.handleGoToSecureCenter.bind(this);
    (this: any).handleDontShowClick = this.handleDontShowClick.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeExitModal());
  }

  handleDontShowClick() {
    // eslint-disable-next-line no-unused-expressions
    this.props.dontShowConfirmExit ? this.props.dispatch(showModal()) : this.props.dispatch(dontShowModal());
  }

  handleGoToSecureCenter() {
    this.handleClose();
    browserHistory.push(`${ROUTE_URLS.WALLET_PAGE }/${ ROUTE_URLS.SECURITY_CENTER}`);
  }

  handleLogOut() {
    this.handleClose();
    if (!this.props.isExit) {
      clearInterval(this.props.intervalId);
      this.props.dispatch(tryToLogout());
    } else if (isClientSide()) {
      window.onbeforeunload = null;
      const win = window.open("about:blank", "_self");
      win.close();
    }
  }

  render(): React.Node {
    return (
      <Modal className="receive-modal exit-modal"
             show={this.props.isExitModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton/>
        <div>
          <Modal.Body>
            <div className="create-title-panel reset img-panel">
              <div className="confirm-exit-image-container">
                <svg className="confirm-exit-image" version="1.0" xmlns="http://www.w3.org/2000/svg"
                     width="124.000000pt" height="124.000000pt" viewBox="0 0 124.000000 124.000000"
                     preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,124.000000) scale(0.100000,-0.100000)"
                     fill="#FBC400" stroke="none">
                    <path d="M480 1221 c-241 -65 -406 -235 -465 -479 -46 -188 22 -407 171 -556
                          72 -72 145 -117 246 -154 63 -23 89 -26 188 -26 99 0 125 3 188 26 199 72 343
                          218 405 413 44 140 20 395 -39 403 -39 6 -47 -20 -27 -85 39 -129 14 -300 -62
                          -428 -105 -179 -330 -285 -538 -255 -446 63 -629 608 -312 925 170 170 432
                          209 644 94 65 -35 77 -36 92 -7 10 19 8 24 -12 41 -13 11 -51 32 -84 47 -132
                          60 -271 75 -395 41z"/>
                    <path d="M592 918 c-8 -8 -12 -59 -12 -165 0 -140 2 -153 19 -163 25 -13 27
                          -13 45 6 13 13 16 42 16 163 0 150 -5 171 -40 171 -9 0 -21 -5 -28 -12z"/>
                    <path d="M391 834 c-62 -67 -81 -114 -81 -209 0 -132 58 -227 172 -285 52 -26
                          72 -30 138 -30 66 0 86 4 138 30 116 58 176 154 177 280 0 90 -30 162 -95 225
                          -33 32 -44 38 -58 29 -29 -19 -25 -43 16 -88 50 -54 65 -101 60 -181 -5 -82
                          -44 -147 -112 -190 -44 -27 -58 -30 -126 -30 -68 0 -82 3 -126 30 -130 81
                          -155 272 -49 375 37 36 46 74 19 84 -26 10 -30 8 -73 -40z"/>
                  </g>
                </svg>
              </div>
              <div className="confirm-exit-desc-container">
                <Translate value="confirmCloseModal.mainTitle"/>
              </div>
              <div className="confirm-exit-btn-container">
                <button onClick={this.handleGoToSecureCenter} className="btn-flex primary-red-btn large">
                  <div><Translate value="confirmCloseModal.secureCenterBtn"/></div>
                </button>
                <button onClick={this.handleLogOut} className="btn-flex primary-white-btn bordered large">
                  {this.props.isExit
                    ? <Translate value="confirmCloseModal.exitBtn"/>
                    : <Translate value="confirmCloseModal.logoutBtn"/>
                  }
                </button>
              </div>
              <div className="confirm-exit-dontshow-panel">
                <label className="control control-checkbox">
                  <Translate value="confirmCloseModal.dontShowBox"/>
                  <input type="checkbox"
                         defaultChecked={this.props.dontShowConfirmExit}
                         onChange={this.handleDontShowClick}/>
                  <div className="control_indicator"/>
                </label>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isExitModalOpen: state.loginState.isExitModalOpen,
    isExit: state.loginState.isExit,
    dontShowConfirmExit: state.loginState.dontShowConfirmExit
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(ExitModal);
