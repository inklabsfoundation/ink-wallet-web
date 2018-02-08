// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import AssetsDetailsHeader from "./assets-details-header";
import AssetsTransactionsPanel from "./assets-transactions-panel";
import {requestHistoryTxsData} from "../../actions/amount-actions";

type Props = {
  dispatch: Dispatch,
  routeParams: Object,
  blockHeight: number
};

class AssetsDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestHistoryTxsData());
  }

  render(): React.Node {
    return (
      <Col className="summary-info-panel paddingless" xs={12}>
        <div className="assets-details">
          <div className="assets-details-header">
            <AssetsDetailsHeader routeParams={this.props.routeParams}/>
          </div>
        </div>
        <AssetsTransactionsPanel routeParams={this.props.routeParams}/>
      </Col>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    blockHeight: state.loginState.blockHeight
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsDetails);
