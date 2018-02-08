// @flow
import * as React from "react";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
// $FlowFixMe
import {connect} from "react-redux";
import type {AmountState, State} from "../../initial-state";
import {ROUTE_URLS} from "../../routes";
import logo from "../../images/logo-md.png";
// $FlowFixMe
import {Link} from "react-router";
import Internalizator from "../../services/internalizator";
import {LANG_LABELS} from "../../locale/dictionary";
import {setLocale, Translate} from "react-redux-i18n";
import type {Dispatch} from "../../types/redux";
import {
  openExitModal, openNewTransactionsModal,
  tryToLogout
} from "../../actions/login-actions";
import {requestWalletData} from "../../actions/amount-actions";
// $FlowFixMe
import refreshIcon from "../../images/refresh-icon.png";
import newTransIcon from "../../images/new-trans.png";
import RotatingImage from "./rotating-image";
import {EXIT_MODAL_SHOW_KEY} from "../../services/confirm-exit-handler";
import {calcNewTransactionsCount} from "../../services/transaction-mapper";
import {Address} from "@evercode-lab/qtumcore-lib";
import openCarretIcon from "../../images/open-carret.png";
import closeCarretIcon from "../../images/close-carret.png";


type Props = {
  i18n: Object,
  dispatch: Dispatch,
  isLoggedId: boolean,
  dontShowConfirmExit: boolean,
  amountState: AmountState,
  address: Address,
  lastTransactionTimeStamp: number,
  unconfirmedTxIds: Array<string>
};

type HeaderState = {
  isLangDropdownOpen: boolean
};

class Header extends React.Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    (this: any).setLang = this.setLang.bind(this);
    (this: any).handleClickLogout = this.handleClickLogout.bind(this);
    (this: any).handleClickRefresh = this.handleClickRefresh.bind(this);
    (this: any).handleResetLastTxClick = this.handleResetLastTxClick.bind(this);
    (this: any).handleClickLangDropdown = this.handleClickLangDropdown.bind(this);
    this.state = {
      isLangDropdownOpen: false
    };
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

  handleResetLastTxClick(newTxCount: ?number) {
    if (newTxCount && newTxCount > 0) {
      this.props.dispatch(openNewTransactionsModal());
    }
  }

  handleClickLangDropdown() {
    const isOpen: boolean = !this.state.isLangDropdownOpen;
    this.setState({isLangDropdownOpen: isOpen});
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
      this.props.lastTransactionTimeStamp,
      this.props.unconfirmedTxIds
    );
    const langHeader: React.Node = (
      <div>
        <span className="lang-label">{Internalizator.getLangLabel(this.props.i18n.locale)}</span>
          <img height={5} width={10} src={this.state.isLangDropdownOpen ? openCarretIcon : closeCarretIcon}/>
      </div>
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
                <NavItem className="lang-dropdown" eventKey={4} onClick={(): void => this.handleResetLastTxClick(newTxCount)}>
                  <img width={16} src={newTransIcon}/>
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
            {this.props.isLoggedId &&
                <NavItem className="lang-dropdown" eventKey={2} onClick={this.handleClickLogout}>
                    <Translate value="header.logoutBtnLabel"/>
                </NavItem>
            }
            <NavDropdown eventKey={1} title={langHeader}
                         className="lang-dropdown"
                         onToggle={this.handleClickLangDropdown}
                         noCaret={true}
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
    lastTransactionTimeStamp: state.loginState.lastTransactionTimeStamp,
    unconfirmedTxIds: state.loginState.unconfirmedTransactionsIds
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(Header);

