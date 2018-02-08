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

class FailRequestModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleRetryRequestData = this.handleRetryRequestData.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeRequestFailModal());
  }

  handleRetryRequestData() {
      this.handleClose();
      this.props.dispatch(requestWalletData());
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
