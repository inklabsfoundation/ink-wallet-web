// @flow
import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";

export const wrapWithWindow = (Component: any): void =>
  class Enhance extends React.Component {
    render() {
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
                  Copyright©2017
                </Col>
                <Col xs={4} className="version-wrapper footer-label">
                  版本号V0.1.1
                </Col>
              </Row>
          </div>
        </div>
      )
    }
  };

