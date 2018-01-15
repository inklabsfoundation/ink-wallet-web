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
  refreshTime: number
}

class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(requestWalletData());
    setInterval(() => {
      this.props.dispatch(requestWalletData());
    }, this.props.refreshTime);
  }
  render() {
    return (
      <Grid className="main-page">
        <NavPanel/>
        <MainPagePanel/>
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
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(authRequired(MainPage));
