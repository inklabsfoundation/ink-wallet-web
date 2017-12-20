// @flow
import * as React from "react";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import AmountPanel from "./amount-panel/amount-panel";
import CurrenciesListPanel from "./currencies-list-panel/currencies-list-panel";
import {Translate} from "react-redux-i18n";


class BalancePanel extends React.Component<{}> {
  render() {
    return (
      <Col className="balance-panel" xs={12}>
        <AmountPanel/>
        <CurrenciesListPanel/>
        <div className="balance-panel-btn-panel">
            <a className="primary-red-btn amount-btn">
              <Translate value="mainPage.importMoreBtn"/>
            </a>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(BalancePanel);
