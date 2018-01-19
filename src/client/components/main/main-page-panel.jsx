// @flow
import * as React from "react";
import {Col} from "react-bootstrap";
import BalancePanel from "./balance-panel/balance-panel";
import RecentTransactionsPanel from "./recent-transactions-panel/recent-transactions-panel";

export default class MainPagePanel extends React.Component<{}> {
  render(): React.Node {
    return (
      <div>
        <Col className="balance-panel-wrapper" xs={4}>
          <BalancePanel/>
        </Col>
        <Col className="recent-transactions-wrapper" xs={6}>
          <RecentTransactionsPanel/>
        </Col>
      </div>
    );
  }
}
