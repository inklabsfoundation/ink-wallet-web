// @flow
import * as React from "react";
// $FlowFixMe
import {Col} from "react-bootstrap";
import AmountPanel from "./amount-panel/amount-panel";
import CurrenciesListPanel from "./currencies-list-panel/currencies-list-panel";
import {Translate} from "react-redux-i18n";


export default class BalancePanel extends React.Component<{}> {
  render(): React.Node {
    return (
      <Col className="balance-panel" xs={12}>
        <AmountPanel/>
        <CurrenciesListPanel/>
        <div className="balance-panel-btn-panel"/>
      </Col>
    );
  }
}

