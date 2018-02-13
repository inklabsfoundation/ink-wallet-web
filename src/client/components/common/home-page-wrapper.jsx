// @flow
import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";
// $FlowFixMe
import {Translate} from "react-redux-i18n";

//TODO Mix with windowed component
export const homePageWrapper = (Component: any): any =>
  class Enhance extends React.Component<{}> {
    render(): React.Node {
      return (
        <div className="main-page-white-container">
          <Grid>
            <Row>
              <Col xs={12}>
                <Component
                  {...this.props}
                  {...this.state}
                />
              </Col>
            </Row>
          </Grid>
          <div>
            <Row className="marger">
              <Col xs={4}/>
              <Col xs={4} className="copyright-wrapper footer-label padder">
                Copyright©{(new Date()).getFullYear()}
              </Col>
              <Col xs={4} className="version-wrapper footer-label">
                版本号V0.0.1
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  };
