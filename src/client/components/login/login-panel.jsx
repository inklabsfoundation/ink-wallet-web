// @flow
import * as React from "react";
import {wrapWithWindow} from "../common/windowed";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import LoginForm from "./login-form";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";

type Props = {
  dispatch: Dispatch,
  isLoggedIn: boolean
}


class LoginPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(): void {
    if (this.props.isLoggedIn) {
      browserHistory.push(ROUTE_URLS.WALLET_PAGE);
    }
  }

  render() {
    return (
      <div className="main-page-form creation-form">
        <div className="creation-heading">
          <span className="heading">
            <Translate value="loginPage.title"/>
          </span>
          <div className="divider"/>
          <LoginForm/>
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

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(wrapWithWindow(LoginPanel));
