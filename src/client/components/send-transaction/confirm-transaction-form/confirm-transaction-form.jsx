// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {confirmConfirmModalAction} from "../../../actions/sent-transaction-action";
import {Button, Modal} from "react-bootstrap";

type Props = {
  dispatch: Dispatch,
}

class ConfirmSendTransactionPanel extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal.Body>
          345
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.dispatch(confirmConfirmModalAction())}>Confirm</Button>
        </Modal.Footer>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {};
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(ConfirmSendTransactionPanel);
