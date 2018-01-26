/* eslint-disable react/prop-types */
// @flow
import * as React from "react";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";
import {isClientSide} from "../../services/is-client-side-helper";

export const authRequired = (Component: any): any => {
  return class extends React.Component<{}> {
    componentWillMount() {
      if (!this.props.isLoggedIn && isClientSide()) {
        browserHistory.replace(ROUTE_URLS.HOME_PAGE);
      }
    }

    render(): React.Node {
      return <div>{this.props.isLoggedIn ? <Component {...this.props} /> : ""}</div>;
    }
  };
};
