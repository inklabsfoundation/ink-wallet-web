// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";

export default class Terms extends React.Component<any> {
  render(): React.Node {
    return (
      <div>
        {/* TODO Withdraw heading in separate component */}
        <div className="page-heading">
          <Col className="page-heading-wrapper" xs={12}>
            <div className="page-heading-container">
              <Translate value="navPanel.terms"/>
            </div>
          </Col>
        </div>
        <Col className="page-text-contaner" xs={12}>
          <div className="page-text-title">
            <Translate value="terms.title1"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc1"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc1_2"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title2"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc2"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title2_1"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc2_1"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title2_2"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc2_2"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title2_3"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc2_3"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title3"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc3_1"/>
          </div>
          <div className="page-text-block-ul">
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_1_ul_1.li1"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_1_ul_1.li2"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_1_ul_1.li3"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_1_ul_1.li4"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_1_ul_1.li5"/>
            </div>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc3_2"/>
          </div>
          <div className="page-text-block-ul">
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_2_ul_2.li1"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_2_ul_2.li2"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc3_2_ul_2.li3"/>
            </div>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title4"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc4"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title5"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc5"/>
          </div>
          <div className="page-text-block-ul">
            <div className="page-text-block-li">
              • <Translate value="terms.desc5_ul_1.li1"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc5_ul_1.li2"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc5_ul_1.li3"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc5_ul_1.li4"/>
            </div>
            <div className="page-text-block-li">
              • <Translate value="terms.desc5_ul_1.li5"/>
            </div>
          </div>

          <div className="page-text-title">
            <Translate value="terms.title6"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc6"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title7"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc7"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title8"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc8"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title9"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc9"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title10"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc10"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title11"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc11"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title12"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc12"/>
          </div>
          <div className="page-text-title">
            <Translate value="terms.title13"/>
          </div>
          <div className="page-text-block">
            <Translate value="terms.desc13"/>
          </div>
        </Col>
      </div>
    );
  }
}
