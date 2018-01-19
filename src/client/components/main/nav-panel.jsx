// @flow
import * as React from "react";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Accordion, Panel, Col} from "react-bootstrap";
import walletIcon from "../../images/wallet-icon.png";
import secureIcon from "../../images/secure-center-logo.png";
import faqIcon from "../../images/faq-icon.png";
import assetsIcon from "../../images/asserts-logo.png";
import qtumIcon21 from "../../images/qtum-icon-21.png";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";

class NavPanel extends React.Component<{}> {
  onClickLink(link: string): void {
    browserHistory.push(link);
  }

  render() {
    const walletPanel = (
      <div onClick={() => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}`)}
        className="default-panel-item">
        <div><img src={walletIcon}/></div>
        <div className="panel-item-title">MyWallet</div>
      </div>
    );
    const securePanel = (
      <div onClick={() => this.onClickLink(`${ROUTE_URLS.WALLET_PAGE}/${ROUTE_URLS.SECURITY_CENTER}`)}>
        <div><img src={secureIcon}/></div>
        <div className="panel-item-title">
            Security Center
        </div>
      </div>
    );
    const faqPanel = (
      <div>
        <div><img src={faqIcon}/></div>
        <div className="panel-item-title">F&Q</div>
      </div>
    );
    const assetsPanel = (
      <div>
        <div><img src={assetsIcon}/></div>
        <div className="panel-item-title">Assets Details</div>
      </div>
    );
    return (
      <Col xs={2} className="nav-panel">
        <Accordion>
          <Panel header={walletPanel} collapsible={false} eventKey="1"/>
          <Panel header={assetsPanel} expanded={true} eventKey="2">
            <div className="assets-list">
              <div className="assets-item">
                <div><img src={qtumIcon21}/></div>
                <div className="panel-item-title">Qtum</div>
              </div>
            </div>
          </Panel>
          <Panel header={securePanel} collapsible={false} eventKey="3"/>
          <Panel header={faqPanel} collapsible={false} eventKey="4"/>
        </Accordion>
      </Col>
    );
  }
}

const mapStateToProps = (): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(NavPanel);
