// @flow
import * as React from "react";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
// $FlowFixMe
import {connect} from "react-redux";
import type {AmountState, State} from "../../initial-state";
import {ROUTE_URLS} from "../../routes";
import logo from "../../images/logo-md.png";
// $FlowFixMe
import {Link, browserHistory} from "react-router";
import Internalizator from "../../services/internalizator";
import {LANG_LABELS} from "../../locale/dictionary";
import {setLocale} from "react-redux-i18n";
import type {Dispatch} from "../../types/redux";
import {openExitModal, setLastTransactionTimeStamp, tryToLogout} from "../../actions/login-actions";
import {requestWalletData} from "../../actions/amount-actions";
// $FlowFixMe
import refreshIcon from "../../images/refresh-icon.png";
import newTransIcon from "../../images/new-trans.png";
import RotatingImage from "./rotating-image";
import {EXIT_MODAL_SHOW_KEY} from "../../services/confirm-exit-handler";
import {calcNewTransactionsCount, getLastTxTimestamp} from "../../services/transaction-mapper";
import {Address} from "@evercode-lab/qtumcore-lib";


type Props = {
  i18n: Object,
  dispatch: Dispatch,
  isLoggedId: boolean,
  dontShowConfirmExit: boolean,
  amountState: AmountState,
  address: Address,
  lastTransactionTimeStamp: number
};

class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).setLang = this.setLang.bind(this);
    (this: any).handleClickLogout = this.handleClickLogout.bind(this);
    (this: any).handleClickRefresh = this.handleClickRefresh.bind(this);
    (this: any).handleResetLastTxClick = this.handleResetLastTxClick.bind(this);
  }

  setLang(lang: string)  {
    localStorage.setItem("locale", lang);
    this.props.dispatch(setLocale(lang));
  }

  handleClickLogout() {
    if (localStorage.getItem(EXIT_MODAL_SHOW_KEY) !== "false") {
      this.props.dispatch(openExitModal());
    } else {
      this.props.dispatch(tryToLogout());
    }
  }

  handleClickRefresh() {
    this.props.dispatch(requestWalletData());
  }

  handleResetLastTxClick() {
    const lastTxTimeStamp: number = getLastTxTimestamp(
      this.props.amountState,
      this.props.address
    );
    console.log("lastTxREset: "+ lastTxTimeStamp);
    this.props.dispatch(setLastTransactionTimeStamp(lastTxTimeStamp));
  }

  render(): React.Node {
    const langDropdown: React.Node = Object.keys(LANG_LABELS).map((key: string, indx: number): React.Node => {
      return (
        this.props.i18n.locale !== key
          ? <MenuItem key={indx} onClick={(): void => this.setLang(key)}
                      eventKey={`1.${indx}`}>{LANG_LABELS[key]}</MenuItem>
          : ""
      );
    });
    const newTxCount: ?number = calcNewTransactionsCount(
      this.props.amountState,
      this.props.address,
      this.props.lastTransactionTimeStamp
    );
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={ROUTE_URLS.HOME_PAGE}>
              <img width={90} src={logo}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.isLoggedId &&
                <NavItem className="lang-dropdown" eventKey={4} onClick={this.handleResetLastTxClick}>
                  <img src={newTransIcon}/>
                  {newTxCount &&
                    <span className="new-transaction-label">{newTxCount}</span>
                  }
                </NavItem>
            }
            {this.props.isLoggedId &&
                <NavItem className="lang-dropdown" eventKey={3} onClick={this.handleClickRefresh}>
                    <RotatingImage image={refreshIcon}/>
                </NavItem>
            }
            {this.props.isLoggedId ?
                <NavItem className="lang-dropdown" eventKey={2} onClick={this.handleClickLogout}>
                  Logout
                </NavItem>
              : <NavItem href="" className="lang-dropdown" eventKey={2} onClick={(): void => browserHistory.push(ROUTE_URLS.LOGIN)}>
                    Login
                </NavItem>
            }
            <NavDropdown eventKey={1} title={Internalizator.getLangLabel(this.props.i18n.locale)}
                         className="lang-dropdown"
                         id="lang-dropdown">
              {langDropdown}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    i18n: state.i18n,
    isLoggedId: state.loginState.isLoggedIn,
    dontShowConfirmExit: state.loginState.dontShowConfirmExit,
    amountState: state.amountState,
    address: state.loginState.address,
    lastTransactionTimeStamp: state.loginState.lastTransactionTimeStamp
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(Header);

