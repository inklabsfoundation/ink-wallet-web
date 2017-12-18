// @flow
import * as React from "react";
import {wrapWithWindow} from "../common/windowed";
//import Mnemonic from "bitcore-mnemonic";
//import qtumcore from "qtumcore-lib";
//import CryptoJS from "crypto-js";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import SetPassword from "./set-password/set-password";
import ShowAddress from "./show-address/show-address";
import {resetCreation, STEPS} from "../../actions/creation-actions";
import ShowMnemonics from "./show-mnemonics/show-mnemonics";

type Props = {
  dispatch: Dispatch,
  step: number
}

class CreateWalletPanel extends React.Component<Props> {

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
        stepPanel = (<SetPassword/>);
        break;
      case STEPS.SECOND:
        stepPanel = (<ShowAddress/>);
        break;
      case STEPS.THIRD:
        stepPanel = (<ShowMnemonics/>);
        break;
      default:
    }

    return (
      <div className="main-page-form creation-form">
        <div className="creation-heading">
          <span className="heading">
            <Translate value="createWallet.title"/>
          </span>
          <div className="divider"/>
          <div className="step-block">
            <span className="step-label">
              {this.props.step}/3
            </span>
          </div>
          {stepPanel}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    step: state.creationState.step
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(wrapWithWindow(CreateWalletPanel));
