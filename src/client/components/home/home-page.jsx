// @flow
import * as React from "react";
import {wrapWithWindow} from "../common/windowed";
import mainLogo from "../../images/logo-md.png";
import {Translate} from "react-redux-i18n";
// $FlowFixMe
import {Link} from "react-router";
import {ROUTE_URLS} from "../../routes";

class HomePanel extends React.Component<{}> {
  render() {
    return (
      <div className="main-page-form">
        <div className="main-page-logo-wrapper">
          <img className="main-page-logo" src={mainLogo}/>
        </div>
        <div className="main-page-button-container">
          <Link to={ROUTE_URLS.CREATE_WALLET_PAGE} className="primary-red-btn">
            <Translate value="main.createWalletBtnLabel"/>
          </Link>
          <Link to={ROUTE_URLS.RESTORE_WALLET_PAGE} className="primary-white-btn">
            <Translate value="main.restoreWalletBtnLabel"/>
          </Link>
        </div>
      </div>
    );
  }
}

export default wrapWithWindow(HomePanel);
