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
          <Col className="page-text-contaner" xs={12}>
            <div className="page-text-title">
              <Translate value="policy.title1"/>
            </div>
            <div className="page-text-block-ul">
              <div className="page-text-block-li">
                <Translate value="policy.desc1_ul_1.li1"/>
              </div>
              <div className="page-text-block-li">
                <Translate value="policy.desc1_ul_1.li2"/>
              </div>
              <div className="page-text-block-li">
                <Translate value="policy.desc1_ul_1.li3"/>
              </div>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title2"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc2"/>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title4"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc4"/>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title5"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc5"/>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title6"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc6"/>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title7"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc7"/>
            </div>
            <div className="page-text-title">
              <Translate value="policy.title8"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc8"/>
            </div>
            <div className="page-text-block">
              <Translate value="policy.desc9"/>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
