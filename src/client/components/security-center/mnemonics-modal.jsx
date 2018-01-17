// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";
// $FlowFixMe
import {CopyToClipboard} from "react-copy-to-clipboard";
import {closeMnemonicModal} from "../../actions/security-center-actions";
import Mnemonic from "bitcore-mnemonic";


type Props = {
  dispatch: Dispatch,
  isMnemonicModalOpen: boolean,
  mnemonic: Mnemonic,
  img: HTMLImageElement
}

class MnemonicModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeMnemonicModal());
  }

  render() {
    return (
      <Modal className="receive-modal"
             show={this.props.isMnemonicModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton/>
        <div>
          <Modal.Body>
            <div className="create-title-panel restore reset img-panel">
              <div className="success-logo">
                <img src={this.props.img.src}/>
              </div>
            </div>
            <div className="create-title-panel">
              <div className="create-title">
                <Translate value="securityCenter.mnemonicsModal.title"/>
              </div>
            </div>
            <div className="create-data-panel">
              <div className="create-data mnemonic-field">
                {this.props.mnemonic.toString()}
              </div>
            </div>
            <div className="create-desc-panel">
              <div className="create-desc mnemonic-desc-advice">
                <Translate value="securityCenter.mnemonicsModal.firstDescription"/>
              </div>
              <div className="create-desc mnemonic-desc-advice">
                <Translate value="securityCenter.mnemonicsModal.secondDescription"/>
              </div>
              <div className="create-desc mnemonic-desc-advice">
                <Translate value="securityCenter.mnemonicsModal.thirdDescription"/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} className="confirm-button primary-red-btn">
              <Translate value="securityCenter.errorModal.doneBtn"/>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isMnemonicModalOpen: state.securityCenterState.isMnemonicModalOpen,
    mnemonic: state.loginState.mnemonic
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(MnemonicModal);
