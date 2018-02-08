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
import faqIconDisable from "../../images/faq-logo.png";
import assetsIconDisable from "../../images/asserts-logo.png";
import assetsIconActive from "../../images/asserts-logo-active.png";
import openCarretIcon from "../../images/open-carret.png";
import closeCarretIcon from "../../images/close-carret.png";
import searchIcon from "../../images/search-icon.png";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";
// $FlowFixMe
import {Link} from "react-router";
import {SUPPORTED_CURRENCIES} from "../../initial-state";
import CurrencyIcon from "../common/currency-icon";
import {Translate} from "react-redux-i18n";

type Props = {
  location: Object
};

type State = {
  isAssetsExpanded: boolean,
  searchNeedle: string
};

class NavPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this: any).isActive = this.isActive.bind(this);
    (this: any).handleSelect = this.handleSelect.bind(this);
    (this: any).handleSearchInput = this.handleSearchInput.bind(this);
    this.state = {
      isAssetsExpanded: true,
      searchNeedle: ""
    };
  }

  onClickLink(link: string) {
    browserHistory.push(link);
  }

  isActive(route: string, exactly: boolean = false): string {
    const path: string = this.props.location.pathname;
    if (exactly) {
      return (path === route) ? "active" : "";
    }
    return (path.includes(route)) ? "active" : "";
  }

  handleSelect() {
    this.setState({isAssetsExpanded: !this.state.isAssetsExpanded});
  }

  handleSearchInput(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({searchNeedle: e.currentTarget.value});
  }

  render(): React.Node {
    const walletPanel = (
      <div onClick={(): void => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}`)}
           className={`${this.isActive(ROUTE_URLS.WALLET_PAGE, true)} nav-elem`}>
        <div>
          <img className="nav-icon" src={
            this.isActive(ROUTE_URLS.WALLET_PAGE, true)
              ? walletIconActive
              : walletIconDisable
          }/>
        </div>
        <div className="panel-item-title"><Translate value="navPanel.wallet"/></div>
      </div>
    );
    const securePanel: React.Node = (
      <div onClick={(): void => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.SECURITY_CENTER}`)}
           className={`${this.isActive(ROUTE_URLS.SECURITY_CENTER)} nav-elem`}>
        <div>
          <img className="nav-icon" src={
            this.isActive(ROUTE_URLS.SECURITY_CENTER)
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
        <div><img className="nav-icon" src={faqIconDisable}/></div>
        <div className="panel-item-title"><Translate value="navPanel.faq"/></div>
      </div>
    );
    const assetsPanel: React.Node = (
      <div className={`${this.isActive(ROUTE_URLS.ASSETS_DETAILS)} nav-elem`}
           onClick={this.handleSelect}>
        <div>
          <img className="nav-icon" src={
            this.isActive(ROUTE_URLS.ASSETS_DETAILS)
              ? assetsIconActive
              : assetsIconDisable
          }/>
        </div>
        <div className="panel-item-title"><Translate value="navPanel.assetsDetails"/></div>
        <div className="open-carret">
          <img height={5} width={10} src={this.state.isAssetsExpanded ? openCarretIcon : closeCarretIcon}/>
        </div>
      </div>
    );
    const assets: Array<React.Node> = Object.keys(SUPPORTED_CURRENCIES).map((key: string): ?React.Node => {
      return key.toLowerCase().includes(this.state.searchNeedle.toLowerCase()) && (
        <div key={key} className="assets-item">
          <div><CurrencyIcon small={true} currencyName={key}/></div>
          <div className="panel-item-title">
            <Link to={`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.ASSETS_DETAILS}/${key}`}>{key}</Link>
          </div>
        </div>
      );
    });
    return (
      <Col xs={2} className="nav-panel">
        <div>
          <Panel header={walletPanel} collapsible={false}/>
          <Panel collapsible={true}
                 expanded={this.state.isAssetsExpanded} header={assetsPanel}>
            <div className="divider"/>
            <div className="search-input-container">
              <input id="assets-search" onChange={this.handleSearchInput} className="search-input"/>
              {this.state.searchNeedle.length === 0
              && <span className="search-placeholder"><Translate value="navPanel.search"/></span>}
              <span className="search-icon"><img width={17} height={16} src={searchIcon}/></span>
            </div>
            <div className="assets-list">
              {assets}
            </div>
          </Panel>
          <Panel header={securePanel} collapsible={false}/>
          <Panel header={faqPanel} collapsible={false}/>
          <div className="bottom-nav-container">
            <div className="bottom-nav-container-inner">
              <div className="link-container">
                <Link className={this.isActive(ROUTE_URLS.TERMS)} to={`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.TERMS}`}>
                  <Translate value="navPanel.terms"/>
                </Link>
              </div>
              <div className="link-container">
                <Link className={this.isActive(ROUTE_URLS.POLICY)} to={`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.POLICY}`}>
                  <Translate value="navPanel.policy"/>
                </Link>
              </div>
              <div className="link-container">
                <Link className={this.isActive(ROUTE_URLS.ABOUT)} to={`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.ABOUT}`}>
                  <Translate value="navPanel.about"/>
                </Link>
              </div>
              <div className="copyright-container">
                <span className="footer-label">Copyright©{(new Date()).getFullYear()}</span>
              </div>
            </div>
          </div>
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
