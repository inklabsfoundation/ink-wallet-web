// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";
// $FlowFixMe
import {Link} from "react-router";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {closeRequestFailModal} from "../../../actions/login-actions";
import {ROUTE_URLS} from "../../../routes";
import {requestWalletData} from "../../../actions/amount-actions";

type Props = {
  dispatch: Dispatch,
  isRequestFailModalOpen: boolean
};

type FailRequestModalState = {
  time: Object,
  seconds: number
};

const RETRY_TIMEOUT_SECONDS = 6;

class FailRequestModal extends React.Component<Props, FailRequestModalState> {
  timer: IntervalID;

  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleRetryRequestData = this.handleRetryRequestData.bind(this);
    (this: any).resetTimer = this.resetTimer.bind(this);
    (this: any).countDown = this.countDown.bind(this);
    (this: any).clearTimer = this.clearTimer.bind(this);
    this.state = {
      time: {},
      seconds: RETRY_TIMEOUT_SECONDS
    };
    // $FlowFixMe
    this.timer = 0;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isRequestFailModalOpen && nextProps.isRequestFailModalOpen) {
      this.resetTimer();
    } else if (this.props.isRequestFailModalOpen && !nextProps.isRequestFailModalOpen) {
      this.clearTimer();
    }
  }

  secondsToTime(secs: number): Object {
    // eslint-disable-next-line no-magic-numbers
    const divisorForMinutes: number = secs % (60 * 60);
    // eslint-disable-next-line no-magic-numbers
    const divisorForSeconds: number = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    return {
      "s": seconds
    };
  }

  resetTimer() {
    this.clearTimer();
    // eslint-disable-next-line no-magic-numbers
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    const seconds: number = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds
    });
    if (seconds === 0) {
      this.props.dispatch(requestWalletData());
      this.resetTimer();
    }
  }

  handleClose() {
    this.props.dispatch(closeRequestFailModal());
  }

  clearTimer() {
    clearInterval(this.timer);
    this.setState({
      time: {},
      seconds: RETRY_TIMEOUT_SECONDS
    });
  }

  handleRetryRequestData() {
    if (!this.state.isRetryDisabled) {
      this.handleClose();
      this.props.dispatch(requestWalletData());
    }
  }

  render(): React.Node {
    return (
      <Modal bsSize={"sm"} className="receive-modal alert-modal"
             show={this.props.isRequestFailModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton/>
        <div>
          <Modal.Body>
            <div className="error-request-container">
              <Translate value="requestErrorModal.title"/>
            </div>
            <div className="error-request-btn-container">
              <Link
                onClick={this.handleClose}
                to={`${ROUTE_URLS.WALLET_PAGE  }/${  ROUTE_URLS.SECURITY_CENTER}`} className="btn-flex primary-red-btn">
                <Translate value="requestErrorModal.resetBtn"/>
              </Link>
              <button onClick={this.handleRetryRequestData}
                      className={"btn-flex primary-white-btn bordered"}>
                <Translate value="requestErrorModal.retryBtn"/>
                {this.state.seconds !== 0 ? ` in ${this.state.seconds - 1}...` : ""}
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isRequestFailModalOpen: state.loginState.isRequestFailModalOpen
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(FailRequestModal);
