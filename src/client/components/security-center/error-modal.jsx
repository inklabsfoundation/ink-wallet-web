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
import {closeErrorModal} from "../../actions/security-center-actions";
import errorImage from "../../images/error-image.png";

type Props = {
  dispatch: Dispatch,
  isErrorModalOpen: boolean
};

class PasswordErrorModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeErrorModal());
  }

  render(): React.Node {
    return (
      <Modal className="receive-modal password-failed-modal"
             show={this.props.isErrorModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton/>
        <div>
          <Modal.Body>
            <div className="create-title-panel reset img-panel">
              <div className="success-logo">
                <img src={errorImage}/>
              </div>
              <div className="mnemonics-title">
                <Translate value="securityCenter.errorModal.title"/>
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
    isErrorModalOpen: state.securityCenterState.isErrorModalOpen
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(PasswordErrorModal);
