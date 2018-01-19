// @flow
import * as React from "react";
import {wrapWithWindow} from "../common/windowed";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {resetCreation, STEPS} from "../../actions/creation-actions";
import SetMnemonics from "./set-mnemonics/set-mnemonics";
import RestoreSuccess from "./restore-success/restore-success";
import ResetPassword from "./reset-password/reset-password";
import {preloadImage} from "../../services/image-preloader";
import successLogo from "../../images/success.png";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";


type Props = {
  dispatch: Dispatch,
  step: number,
  isLoggedIn: boolean
}


class RestoreWalletPanel extends React.Component<Props> {
  successImage: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);
    this.successImage = preloadImage(successLogo);
  }

  componentDidUpdate(): void {
    if (this.props.isLoggedIn) {
      browserHistory.push(ROUTE_URLS.WALLET_PAGE);
    }
  }

  componentDidMount(): void {
    this.props.dispatch(resetCreation());
  }

  componentWillUnmount(): void {
    this.props.dispatch(resetCreation());
  }

  render() {
    let stepPanel;
    switch (this.props.step) {
      case STEPS.FIRST:
        stepPanel = (<SetMnemonics/>);
        break;
      case STEPS.SECOND:
        stepPanel = (<ResetPassword/>);
        break;
      case STEPS.THIRD:
        stepPanel = (<RestoreSuccess successImage={this.successImage}/>);
        break;
    }

    return (
      <div className="main-page-form creation-form">
        <div className="creation-heading">
          <span className="heading">
            <Translate value="restoreWallet.title"/>
          </span>
          <div className="divider"/>
          {stepPanel}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    step: state.creationState.step,
    isLoggedIn: state.loginState.isLoggedIn
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(wrapWithWindow(RestoreWalletPanel));
