/* eslint-disable max-len */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {closeReceiveModal} from "../../actions/receive-actions";
import {Button, Modal} from "react-bootstrap";
// $FlowFixMe
import QRCode from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard";

type Props = {
  dispatch: Dispatch,
  isModalOpen: boolean,
  address: string,
}

class ReceiveModal extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeReceiveModal());
  }

  render() {
    return (
      <Modal className="receive-modal"
             show={this.props.isModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton>
          <Modal.Title>
            <Translate value="receive.modalTitle"/>
          </Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <div className="qr-code-wrapper">
              <div className="qr-code-container">
                <QRCode size={150} value={`qtum:${this.props.address}?label=INK Mobile Wallet`}/>
              </div>
            </div>
            <div className="receive-qr-desc">
              <Translate value="receive.qrDescription"/>
            </div>
            <div className="receive-address-block">
              <div className="receive-address-desc">
                <Translate value="receive.addressLabel"/>
              </div>
              <div className="receive-address">
                {this.props.address}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CopyToClipboard text={this.props.address}>
              <Button className="confirm-button primary-red-btn">
                <Translate value="receive.copyBtn"/>
              </Button>
            </CopyToClipboard>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isModalOpen: state.receiveState.isModalOpen,
    address: state.loginState.address.toString()
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(ReceiveModal);
