/* eslint-disable no-undef */
// @flow
import * as React from "react";
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
// $FlowFixMe
import {connect} from "react-redux";
import type {State} from "../../initial-state";
import {ROUTE_URLS} from "../../routes";
import logo from "../../images/logo-md.png";
// $FlowFixMe
import {Link} from "react-router";
import Internalizator from "../../services/internalizator";
import {LANG_LABELS} from "../../locale/dictionary";
import {setLocale} from "react-redux-i18n";
import type {Dispatch} from "../../types/redux";


type Props = {
  i18n: Object,
  dispatch: Dispatch
}

class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).setLang = this.setLang.bind(this);
  }

  setLang(lang: string): void {
    localStorage.setItem("locale", lang);
    this.props.dispatch(setLocale(lang));
  }

  render() {
    const langDropdown: React.Node = Object.keys(LANG_LABELS).map((key: string, indx: number) => {
      return (
        this.props.i18n.locale !== key
          ? <MenuItem key={indx} onClick={() => this.setLang(key)}
                      eventKey={`1.${indx}`}>{LANG_LABELS[key]}</MenuItem>
          : ""
      );
    });
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={ROUTE_URLS.HOME_PAGE}>
              <img width={100} src={logo}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
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
    i18n: state.i18n
  };
};

export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(Header);

