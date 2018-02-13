// @flow
import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";
// $FlowFixMe
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fonts.css";
import "../../styles/main.css";
import "../../styles/common.css";
import PhonePanel from "../main/phone-panel/phone-panel";

export const MobilePage = (): React.Node => (
  <PhonePanel isMobile={true}
              description={MobileDescription()}/>
);

export const MobileDescription = (): React.Node => (
    <span>Mobile wallet app is coming soon.<br/>Now you can use web wallet on desktop <a
      href="https://wallet.ink.one">https://wallet.ink.one</a>
                </span>
);
