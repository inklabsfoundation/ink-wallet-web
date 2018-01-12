// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
import {Address} from "@evercode-lab/qtumcore-lib";
// $FlowFixMe
import {connect} from "react-redux";
import {
  commitAddress
} from "../../../actions/creation-actions";

type Props = {
  dispatch: Dispatch,
  address: Address
}

class ShowAddress extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(): void {
    this.props.dispatch(commitAddress());
  }

  render() {
    return (
      <div>
        <div className="progress-panel">
          <div className="progress-bar-first-step"/>
          <div className="progress-bar-second-step"/>
          <div className="progress-bar-undone"/>
        </div>
        <div className="create-title-panel">
          <div className="create-title">
            <Translate value="createWallet.showAddressTitle"/>
          </div>
        </div>
        <div className="create-data-panel">
          <div className="create-data">
            {this.props.address.toString()}
          </div>
        </div>
        <div className="create-desc-panel">
          <div className="create-desc">
            <Translate value="createWallet.showAddressDescr"/>
          </div>
        </div>
        <div className="create-btn-panel">
          <a onClick={this.handleClickNext}
             className="primary-red-btn btn-flex">
            <Translate value="createWallet.showAddressNextBtn"/>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    address: state.creationState.address
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(ShowAddress);
