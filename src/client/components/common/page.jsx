// @flow
import * as React from "react";
// $FlowFixMe
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fonts.css";
import "../../styles/main.css";
import "../../styles/common.css";
import "../../styles/header.css";
import "../../styles/creation.css";
import "../../styles/restore.css";
import "../../styles/login.css";
import "../../styles/security-center.css";
import "../../styles/main-page/main-page.css";
import "../../styles/main-page/nav-panel.css";
import "../../styles/main-page/balance-panel/balance-panel.css";
import "../../styles/main-page/balance-panel/amount-panel/amount-panel.css";
import "../../styles/main-page/balance-panel/currencies-list-panel/currencies-list-panel.css";
import "../../styles/main-page/recent-transactions-panel/recent-transactions-panel.css";
import "../../styles/main-page/phone-panel/phone-panel.css";
import "../../styles/main-page/news-panel/news-panel.css";
import "../../styles/send-transaction/send-transaction-modal.css";
import "../../styles/assets-details.css";
import "../../styles/receive/receive.css";
import "../../styles/details-datepicker.css";
import type {Location} from "react-router";
import Header from "./header";
// $FlowFixMe
import {Helmet} from "react-helmet";
import favicon from "../../images/favicon.png";

type Props = {
  children: React.Node,
  location: Location
};

export default class Page extends React.Component<Props> {
  render(): React.Node {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Helmet>
          <link rel="icon" href={favicon} sizes="32x32"/>
          <title>INK Wallet</title>
        </Helmet>
      </div>
    );
  }
}
