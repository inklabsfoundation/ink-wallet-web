// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";

export default class FAQ extends React.Component<any> {
  render(): React.Node {
    return (
      <div>
        {/* TODO Withdraw heading in separate component */}
        <div className="page-heading">
          <Col className="page-heading-wrapper" xs={12}>
            <div className="page-heading-container">
              <Translate value="navPanel.faq"/>
            </div>
          </Col>
          <Col className="page-text-contaner" xs={12}>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_1"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_1"/>
            </div>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_2"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_2"/>
            </div>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_3"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_3"/>
            </div>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_4"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_4"/>
            </div>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_5"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_5"/>
            </div>
            <div className="page-text-block-q">
              <Translate value="FAQ.q_6"/>
            </div>
            <div className="page-text-block-a">
              <Translate value="FAQ.a_6"/>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
