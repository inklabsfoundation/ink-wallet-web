// @flow
import * as React from "react";
import {authRequired} from "../common/authorized";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Grid} from "react-bootstrap";
import NavPanel from "./nav-panel";
import {requestWalletData} from "../../actions/amount-actions";
import {openExitModal, setExit} from "../../actions/login-actions";
import ExitModal from "./exit-modal/exit-modal";
import FailRequestModal from "./fail-request-modal/fail-request-modal";
import CountTransactionsModal from "./count-transactions-modal/count-transactions-modal";
import {EXIT_MODAL_SHOW_KEY} from "../../services/confirm-exit-handler";
import {isClientSide} from "../../services/is-client-side-helper";
import SendTransactionModal from "../send-transaction/sent-transaction-modal";
import ReceiveModal from "../receive/receive-modal";

type Props = {
  isLoggedIn: boolean,
  dispatch: Dispatch,
  refreshTime: number,
  children: React.Node,
  dontShowConfirmExit: boolean,
  location: string
};

class MainPage extends React.Component<Props> {
  refresh: IntervalID;

  constructor(props: Props) {
    super(props);
    (this: any).closeIt = this.closeIt.bind(this);
  }

  closeIt(): string {
    this.props.dispatch(setExit());
    this.props.dispatch(openExitModal());
    return "Are you sure?";
  }

  componentDidMount() {
    this.props.dispatch(requestWalletData(true));
    if (localStorage.getItem(EXIT_MODAL_SHOW_KEY) !== "false" && isClientSide()) {
      window.onbeforeunload = this.closeIt;
    }
    this.refresh = setInterval(() => {
      this.props.dispatch(requestWalletData());
    }, this.props.refreshTime);
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
    window.onbeforeunload = null;
  }

  render(): React.Node {
    return (
      <Grid className="main-page">
        <NavPanel location={this.props.location}/>
        {this.props.children}
        <ExitModal intervalId={this.refresh}/>
        <FailRequestModal/>
        <CountTransactionsModal/>
        <SendTransactionModal/>
        <ReceiveModal/>
      </Grid>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    isLoggedIn: state.loginState.isLoggedIn,
    refreshTime: state.config.refreshTime,
    showConfirmExit: state.loginState.dontShowConfirmExit
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(authRequired(MainPage));
