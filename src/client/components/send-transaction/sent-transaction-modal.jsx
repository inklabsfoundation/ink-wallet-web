// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {
  closeModal,
  confirmPrepareModal,
  openModal,
  requestRecomendedFee,
  requestUtxos,
  resetModal,
  sentTransaction,
  STEPS
} from "../../actions/sent-transaction-action";
import {Modal} from "react-bootstrap";
import PrepareTransactionForm, {
  selectFeeValue,
  STANDART_FEE
} from "./prepare-transaction-form/prepare-transaction-form";
import ConfirmSendTransactionPanel from "./confirm-transaction-form/confirm-transaction-form";
import SuccessSendTransactionPanel from "./success-send-transaction-panel/success-send-transaction-panel";
import {requestWalletData} from "../../actions/amount-actions";
import {preloadImage} from "../../services/image-preloader";
import successLogo from "../../images/success.png";
import {SUPPORTED_CURRENCIES} from "../../initial-state";

type Props = {
  dispatch: Dispatch,
  step: number,
  isModalOpen: boolean,
  qtumAmount: number,
  recommendedFee: number,
  tokenRecommendedFee: number,
  tokenType: string,
  address: string,
  amount: number,
  fee: number,
  description: string,
  passwordHash: string,
  salt: string,
  inkAmount: number
};

class SendTransactionModal extends React.Component<Props> {
  successImage: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleOpen = this.handleOpen.bind(this);
    (this: any).handleDone = this.handleDone.bind(this);
    (this: any).handleSubmitPrepareSendTransaction = this.handleSubmitPrepareSendTransaction.bind(this);
    (this: any).handleSubmitConfirmSendTransaction = this.handleSubmitConfirmSendTransaction.bind(this);
    this.successImage = preloadImage(successLogo);
  }

  handleClose() {
    this.props.dispatch(closeModal());
    this.props.dispatch(resetModal());
  }

  handleDone() {
    this.handleClose();
    this.props.dispatch(requestWalletData());
  }

  handleOpen() {
    this.props.dispatch(requestUtxos());
    this.props.dispatch(requestRecomendedFee());
    this.props.dispatch(openModal());
  }

  handleSubmitPrepareSendTransaction(values: Object) {
    const recommendedFee: number = values.token === SUPPORTED_CURRENCIES.QTUM ?
      this.props.recommendedFee : this.props.tokenRecommendedFee;
    const fee: number = values.isStandart === "1"
      ? STANDART_FEE
      : selectFeeValue(recommendedFee, +values.feeCoef);
    this.props.dispatch(
      confirmPrepareModal(
        values.token,
        values.to,
        values.amount,
        values.desc,
        fee
      ));
  }

  handleSubmitConfirmSendTransaction() {
    this.props.dispatch(sentTransaction());
  }

  render(): React.Node {
    let stepPanel: Object;
    switch (this.props.step) {
      case STEPS.FIRST:
        // eslint-disable-next-line react/jsx-handler-names
        stepPanel = (
          <PrepareTransactionForm qtumAmount={this.props.qtumAmount}
                                  inkAmount={this.props.inkAmount}
                                  recommendedFee={this.props.recommendedFee}
                                  tokenRecommendedFee={this.props.tokenRecommendedFee}
                                  onSubmit={this.handleSubmitPrepareSendTransaction}/>
        );
        break;
      case STEPS.SECOND:
        stepPanel = (
          <ConfirmSendTransactionPanel
            tokenType={this.props.tokenType}
            address={this.props.address}
            amount={this.props.amount}
            fee={this.props.fee}
            description={this.props.description}
            salt={this.props.salt}
            onSubmit={this.handleSubmitConfirmSendTransaction}
            passwordHash={this.props.passwordHash}/>
        );
        break;
      case STEPS.THIRD:
        stepPanel = (<SuccessSendTransactionPanel
          successImage={this.successImage}
          onClose={this.handleDone}/>);
        break;
    }

    return (
      <Modal className="send-transition-modal"
             show={this.props.isModalOpen} onHide={this.handleClose}>
        <Modal.Header className="send-modal-header" closeButton>
          <Modal.Title>
            <Translate value="sendTransaction.modalTitle"/>
          </Modal.Title>
        </Modal.Header>
        {stepPanel}
      </Modal>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    step: state.sendTransactionState.step,
    isModalOpen: state.sendTransactionState.isModalOpen,
    qtumAmount: state.amountState.QTUM.balance,
    recommendedFee: state.sendTransactionState.recommendedFee,
    tokenRecommendedFee: state.sendTransactionState.tokenRecommendedFee,
    tokenType: state.sendTransactionState.tokenType,
    address: state.sendTransactionState.toAddress,
    amount: state.sendTransactionState.amount,
    fee: state.sendTransactionState.fee,
    description: state.sendTransactionState.description,
    passwordHash: state.loginState.passwordHash,
    salt: state.config.encryptSalt,
    inkAmount: state.amountState.INK.balance
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(SendTransactionModal);
