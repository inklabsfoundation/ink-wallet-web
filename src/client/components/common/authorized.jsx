/* eslint-disable react/prop-types */
// @flow
import * as React from "react";
import {ROUTE_URLS} from "../../routes";
// $FlowFixMe
import {browserHistory} from "react-router";

export const authRequired = (Component: any): any => {
  return class extends React.Component<{}> {
    componentWillMount() {
      if (!this.props.isLoggedIn && typeof window !== "undefined") {
        browserHistory.replace(ROUTE_URLS.HOME_PAGE);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};
