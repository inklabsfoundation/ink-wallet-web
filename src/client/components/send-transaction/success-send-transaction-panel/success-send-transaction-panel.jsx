// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";

type Props = {
  dispatch: Dispatch,
  onClose: Function,
  successImage: HTMLImageElement,
  failImage: HTMLImageElement,
  transactionSendFail: boolean
};

class SuccessSendTransactionPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.Node {
    return (
      <div>
        <Modal.Body>
          {this.props.transactionSendFail
            ? <div className="create-title-panel reset">
                <div className="success-logo">
                  <img src={this.props.failImage.src}/>
                </div>
                <div className="create-title">
                  <Translate value="sendTransaction.successForm.fail"/>
                </div>
            </div>
            : <div className="create-title-panel reset">
                <div className="success-logo">
                  <img src={this.props.successImage.src}/>
                </div>
                <div className="create-title">
                  <Translate value="sendTransaction.successForm.succeed"/>
                </div>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button className="confirm-button primary-red-btn"
                  onClick={(): void => this.props.onClose()}>
            <Translate value="sendTransaction.successForm.doneBtn"/>
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(SuccessSendTransactionPanel);
