// @flow
import * as React from "react";
import {authRequired} from "../common/authorized";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Grid} from "react-bootstrap";
import NavPanel from "./nav-panel";
import MainPagePanel from "./main-page-panel";
import {requestWalletData} from "../../actions/amount-actions";

type Props = {
  isLoggedIn: boolean,
  dispatch: Dispatch,
  refreshTime: number,
  children: React.Node
};

let refresh: number = 0;

class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(requestWalletData());
    refresh = setInterval(() => {
      this.props.dispatch(requestWalletData());
    }, this.props.refreshTime);
  }

  componentWillUnmount() {
    clearInterval(refresh);
  }

  render(): React.Node {
    return (
      <Grid className="main-page">
        <NavPanel/>
        {this.props.children}
      </Grid>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isLoggedIn: state.loginState.isLoggedIn,
    refreshTime: state.config.refreshTime
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(authRequired(MainPage));
