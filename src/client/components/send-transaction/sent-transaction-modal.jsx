/* eslint-disable max-len */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {
  closeModal, confirmPrepareModalAction, openModal, requestUtxos, resetModal, sentTransaction,
  STEPS
} from "../../actions/sent-transaction-action";
import {Modal} from "react-bootstrap";
import PrepareTransactionForm from "./prepare-transaction-form/prepare-transaction-form";
import ConfirmSendTransactionPanel from "./confirm-transaction-form/confirm-transaction-form";
import SuccessSendTransactionPanel from "./success-send-transaction-panel/success-send-transaction-panel";

type Props = {
  dispatch: Dispatch,
  step: number,
  isModalOpen: boolean
}

class SendTransactionModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleOpen = this.handleOpen.bind(this);
    (this: any).handleSubmitPrepareSendTransactionPanel = this.handleSubmitPrepareSendTransactionPanel.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(requestUtxos());
  }

  handleClose() {
    this.props.dispatch(closeModal());
    this.props.dispatch(resetModal());
  }

  handleOpen() {
    this.props.dispatch(openModal());
  }

  handleSubmitPrepareSendTransactionPanel(values: Object) {
    this.props.dispatch(sentTransaction(values.to, +values.amount, values.desc));
  }

  render() {
    let stepPanel: Object;
    switch (this.props.step) {
      case STEPS.FIRST:
        // eslint-disable-next-line react/jsx-handler-names
        stepPanel = (<PrepareTransactionForm onSubmit={this.handleSubmitPrepareSendTransactionPanel}/>);
        break;
      case STEPS.SECOND:
        stepPanel = (<ConfirmSendTransactionPanel/>);
        break;
      case STEPS.THIRD:
        stepPanel = (<SuccessSendTransactionPanel onClose={this.handleClose}/>);
        break;
      default:
    }

    return (
      <Modal className="send-transition-modal"
             show={this.props.isModalOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send</Modal.Title>
          {stepPanel}
        </Modal.Header>
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    step: state.sendTransactionState.step,
    isModalOpen: state.sendTransactionState.isModalOpen
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(SendTransactionModal);
