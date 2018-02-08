// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {AmountState, State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";
// $FlowFixMe
import {CopyToClipboard} from "react-copy-to-clipboard";
import {
  closeNewTransactionsModal, setLastTransactionTimeStamp,
  setUnconfirmedTxsIds
} from "../../../actions/login-actions";
import {calcNewTransactionsCount, getLastTxTimestamp, getUnconfirmedTxsIds} from "../../../services/transaction-mapper";
import {Address} from "@evercode-lab/qtumcore-lib";

type Props = {
  dispatch: Dispatch,
  isNewTransactionsModalOpen: boolean,
  amountState: AmountState,
  address: Address,
  lastTransactionTimeStamp: number,
  unconfirmedTxIds: Array<string>
};

class CountTransactionsModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).handleClose = this.handleClose.bind(this);
    (this: any).handleClickOk = this.handleClickOk.bind(this);
  }

  handleClickOk() {
    const lastTxTimeStamp: number = getLastTxTimestamp(
      this.props.amountState,
      this.props.address
    );
    const unconfirmedTxsIds: Array<string> = getUnconfirmedTxsIds(
      this.props.amountState,
      this.props.address
    );
    this.props.dispatch(setUnconfirmedTxsIds(unconfirmedTxsIds));
    this.props.dispatch(setLastTransactionTimeStamp(lastTxTimeStamp));
  }

  handleClose() {
    this.handleClickOk();
    this.props.dispatch(closeNewTransactionsModal());
  }

  render(): React.Node {
    const newTxCount: ?number = calcNewTransactionsCount(
      this.props.amountState,
      this.props.address,
      this.props.lastTransactionTimeStamp,
      this.props.unconfirmedTxIds
    );
    return (
      <Modal bsSize={"sm"} className="receive-modal alert-modal"
             show={this.props.isNewTransactionsModalOpen} onHide={this.handleClose}>
        <Modal.Header className="receive-modal-header" closeButton/>
        <div>
          <Modal.Body>
            <div className="new-transactions-container">
              {`${newTxCount ? newTxCount : ""} `}<Translate value="newTransactionsModal.title"/>
            </div>
            <div className="new-transactions-btn-container">
              <button onClick={this.handleClose} className="btn-flex primary-red-btn bordered">
                <Translate value="newTransactionsModal.ok"/>
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
    isNewTransactionsModalOpen: state.loginState.isNewTransactionsModalOpen,
    amountState: state.amountState,
    address: state.loginState.address,
    lastTransactionTimeStamp: state.loginState.lastTransactionTimeStamp,
    unconfirmedTxIds: state.loginState.unconfirmedTransactionsIds
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(CountTransactionsModal);
