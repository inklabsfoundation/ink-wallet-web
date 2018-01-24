// @flow
import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";

export const wrapWithWindow = (Component: any): any =>
  class Enhance extends React.Component<{}> {
    render(): React.Node {
      return (
        <div className="main-page-container">
          <Grid>
            <Row>
              <Col xs={12}>
                <div className="window-wrapper">
                  <Component
                    {...this.props}
                    {...this.state}
                  />
                </div>
              </Col>
            </Row>
          </Grid>
          <div className="footer">
              <Row>
                <Col xs={4}/>
                <Col xs={4} className="copyright-wrapper footer-label">
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

