// @flow
import * as React from "react";
// $FlowFixMe
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fonts.css";
import "../../styles/main.css";
import "../../styles/common.css";
import "../../styles/header.css";
import "../../styles/creation.css";
import type {Location} from "react-router";
import Header from "./header";

type Props = {
  children: React.Node;
  location: Location;
}

export default class Page extends React.Component<Props> {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
