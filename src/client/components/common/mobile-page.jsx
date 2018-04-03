// @flow
import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";
// $FlowFixMe
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fonts.css";
import "../../styles/main.css";
import "../../styles/common.css";
import PhonePanel from "../main/phone-panel/phone-panel";

export const mobileDescription = (): React.Node => (
  <span>Scan the QR code or follow<br/>the <a
    href="https://ink.one/ink-wallet-android">link</a> to download mobile wallet
                </span>
);

export const MobilePage = (): React.Node => (
  <PhonePanel isMobile={true}
              description={mobileDescription()}/>
);

