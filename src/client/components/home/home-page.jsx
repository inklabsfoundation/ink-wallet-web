// @flow
import * as React from "react";
import {wrapWithWindow} from "../common/windowed";
import mainLogo from "../../images/logo-md.png";
import {Translate} from "react-redux-i18n";
// $FlowFixMe
import {Link} from "react-router";
import {ROUTE_URLS} from "../../routes";
import type {Dispatch} from "../../types/redux";
import type {State} from "../../initial-state";
// $FlowFixMe
import {connect} from "react-redux";

type Props = {
  isLoggedIn: boolean
};

class HomePanel extends React.Component<Props> {
  render(): React.Node {
    return (
      <div className="main-page-form">
        <div className="main-page-logo-wrapper">
          <img className="main-page-logo" src={mainLogo}/>
        </div>
        <div className="main-page-button-container">
          {this.props.isLoggedIn
            ? <Link to={ROUTE_URLS.WALLET_PAGE} className="primary-red-btn main-page-btn">
                <Translate value="main.backToWalletBtn"/>
              </Link>
            : <Link to={ROUTE_URLS.LOGIN} className="primary-red-btn">
                <Translate value="header.loginBtnLabel"/>
              </Link>
          }
          <Link to={ROUTE_URLS.CREATE_WALLET_PAGE} className="primary-white-btn main-page-btn">
            <Translate value="main.createWalletBtnLabel"/>
          </Link>
          <Link to={ROUTE_URLS.RESTORE_WALLET_PAGE} className="primary-white-btn main-page-btn">
            <Translate value="main.restoreWalletBtnLabel"/>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isLoggedIn: state.loginState.isLoggedIn
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(wrapWithWindow(HomePanel));

