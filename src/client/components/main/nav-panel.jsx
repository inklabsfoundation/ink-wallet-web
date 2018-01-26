// @flow
import * as React from "react";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Accordion, Panel, Col, PanelGroup} from "react-bootstrap";
import walletIconActive from "../../images/wallet-icon-act.png";
import walletIconDisable from "../../images/wallet-icon-dis.png";
import secureIconActive from "../../images/secure-center-logo-active.png";
import secureIconDisable from "../../images/secure-center-logo.png";
import faqIcon from "../../images/faq-icon.png";
import assetsIcon from "../../images/asserts-logo.png";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";
import {SUPPORTED_CURRENCIES} from "../../initial-state";
import CurrencyIcon from "../common/currency-icon";
import {Translate} from "react-redux-i18n";

type Props = {
  location: Object
};

type State = {
  activeKey: boolean,
  searchNeedle: string
};

class NavPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this: any).isActive = this.isActive.bind(this);
    (this: any).handleSelect = this.handleSelect.bind(this);
    (this: any).handleSearchInput = this.handleSearchInput.bind(this);
    this.state = {
      activeKey: true,
      searchNeedle: ""
    };
  }

  onClickLink(link: string) {
    browserHistory.push(link);
  }

  isActive(route: string): string {
    return (this.props.location.pathname === route) ? "active" : "";
  }

  handleSelect() {
    this.setState({activeKey: !this.state.activeKey});
  }

  handleSearchInput(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({searchNeedle: e.currentTarget.value});
  }

  render(): React.Node {
    const walletPanel = (
      <div onClick={(): void => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}`)}
           className={`${this.isActive(ROUTE_URLS.WALLET_PAGE)} nav-elem`}>
        <div>
          <img src={
            this.isActive(ROUTE_URLS.WALLET_PAGE)
              ? walletIconActive
              : walletIconDisable
          }/>
        </div>
        <div className="panel-item-title"><Translate value="navPanel.wallet"/></div>
      </div>
    );
    const securePanel: React.Node = (
      <div onClick={(): void => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.SECURITY_CENTER}`)}
           className={`${this.isActive(`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.SECURITY_CENTER}`)} nav-elem`}>
        <div>
          <img src={
            this.isActive(`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.SECURITY_CENTER}`)
              ? secureIconActive
              : secureIconDisable
          }/>
        </div>
        <div className="panel-item-title">
          <Translate value="navPanel.securityCenter"/>
        </div>
      </div>
    );
    const faqPanel: React.Node = (
      <div className="nav-elem">
        <div><img src={faqIcon}/></div>
        <div className="panel-item-title"><Translate value="navPanel.faq"/></div>
      </div>
    );
    const assetsPanel: React.Node = (
      <div className="nav-elem" onClick={this.handleSelect}>
        <div><img src={assetsIcon}/></div>
        <div className="panel-item-title"><Translate value="navPanel.assetsDetails"/></div>
      </div>
    );
    const assets: Array<React.Node> = Object.keys(SUPPORTED_CURRENCIES).map((key: string): ?React.Node => {
      return key.toLowerCase().includes(this.state.searchNeedle.toLowerCase()) && (
        <div key={key} className="assets-item">
          <div><CurrencyIcon small={true} currencyName={key}/></div>
          <div className="panel-item-title">{key}</div>
        </div>
      );
    });
    return (
      <Col xs={2} className="nav-panel">
        <div>
          <Panel header={walletPanel} collapsible={false}/>
          <Panel collapsible={true}
                 expanded={this.state.activeKey} header={assetsPanel}>
            <div className="divider"/>
            <div className="search-input-container">
              <input id="assets-search" onChange={this.handleSearchInput} className="search-input"/>
              {this.state.searchNeedle.length === 0
                && <span className="search-placeholder">SEARCH...</span>}
                <span className="search-icon"><i className="glyphicon glyphicon-search"/></span>
            </div>
            <div className="assets-list">
              {assets}
            </div>
          </Panel>
          <Panel header={securePanel} collapsible={false}/>
          <Panel header={faqPanel} collapsible={false}/>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(NavPanel);
