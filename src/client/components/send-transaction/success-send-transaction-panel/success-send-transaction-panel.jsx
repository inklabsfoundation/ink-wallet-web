// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";

type Props = {
  dispatch: Dispatch,
  onClose: Function
}

class SuccessSendTransactionPanel extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal.Body>
          123
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onClose()}>Done</Button>
        </Modal.Footer>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {};
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(SuccessSendTransactionPanel);
