// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";

export default class Policy extends React.Component<any> {
  render(): React.Node {
    return (
      <div>
        {/* TODO Withdraw heading in separate component */}
        <div className="page-heading">
          <Col className="page-heading-wrapper" xs={12}>
            <div className="page-heading-container">
              <Translate value="navPanel.policy"/>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
