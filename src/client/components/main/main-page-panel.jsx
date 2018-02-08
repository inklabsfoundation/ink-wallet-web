// @flow
import * as React from "react";
import {Col} from "react-bootstrap";
import BalancePanel from "./balance-panel/balance-panel";
import RecentTransactionsPanel from "./recent-transactions-panel/recent-transactions-panel";
import PhonePanel from "./phone-panel/phone-panel";
import NewsPanel from "./news-panel/news-panel";

export default class MainPagePanel extends React.Component<{}> {
  render(): React.Node {
    return (
      <div>
        <Col className="balance-panel-wrapper" xs={5}>
          <BalancePanel/>
        </Col>
        <Col className="recent-transactions-wrapper" xs={7}>
          <RecentTransactionsPanel/>
        </Col>
        <Col className="recent-transactions-wrapper" xs={7}>
          <NewsPanel/>
          <PhonePanel/>
        </Col>
      </div>
    );
  }
}
