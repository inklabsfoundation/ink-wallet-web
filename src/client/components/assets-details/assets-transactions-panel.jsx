// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import AssetsTransactionsList from "./assets-transactions-list";

type Props = {
  dispatch: Dispatch,
  routeParams: Object
};

type AssetsDetailsState = {
  activeTab: string
};

export const ASSETS_DETAILS_TABS = {
  ALL: "ALL",
  SEND: "SEND",
  RECEIVED: "RECEIVED"
};

class AssetsTransactionsPanel extends React.Component<Props, AssetsDetailsState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: ASSETS_DETAILS_TABS.ALL
    };
    (this: any).handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(tab: string) {
    this.setState({activeTab: tab});
  }

  render(): React.Node {
    const activeTab: string = this.state.activeTab;
    return (
      <div>
        <div className="assets-transactions-panel">
          <div>
            <div className="assets-transactions-tab-btns">
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.ALL ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.ALL)}>
                <Translate value="assetsDetails.allTabLabel"/>
              </div>
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.SEND ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.SEND)}>
                <Translate value="assetsDetails.sendTabLabel"/>
              </div>
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.RECEIVED ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.RECEIVED)}>
                <Translate value="assetsDetails.receivedTabLabel"/>
              </div>
            </div>
            <div className="assets-transactions-time-panel">
              <div/>
              <div/>
              <div/>
            </div>
          </div>
        </div>
        <AssetsTransactionsList routeParams={this.props.routeParams} tab={this.state.activeTab}/>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsTransactionsPanel);
