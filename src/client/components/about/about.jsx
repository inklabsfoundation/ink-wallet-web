// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";

export default class About extends React.Component<any> {
  render(): React.Node {
    return (
      <div>
        {/* TODO Withdraw heading in separate component */}
        <div className="page-heading">
          <Col className="page-heading-wrapper" xs={12}>
            <div className="page-heading-container">
              <Translate value="navPanel.about"/>
            </div>
          </Col>
        </div>
        <Col className="page-text-contaner" xs={12}>
          <div className="page-text-block">
            <Translate value="about.desc1"/>
          </div>
          <div className="page-text-block">
            <Translate value="about.desc2"/>
          </div>
        </Col>
      </div>
    );
  }
}
