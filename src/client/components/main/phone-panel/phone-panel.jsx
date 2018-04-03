// @flow
import * as React from "react";
// $FlowFixMe
import {Col} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import phoneImg from "../../../images/phone_img.png";
import mainLogo from "../../../images/logo-md.png";
import qrCode from "../../../images/qr-code.png";
// $FlowFixMe
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";

type Props = {
  description: React.Node,
  isMobile: boolean
};

class PhonePanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.Node {
    return (
      <div className={this.props.isMobile ? "phone-panel-mobile" : "phone-panel-desktop"}>
        <div className="phone-img-container">
          <div className="phone-img">
            <img className="phone-icon" src={phoneImg}/>
            <img className="ink-logo-img" src={mainLogo}/>
            <div className="qr-code" style={{textAlign: "center"}}>
              <img width={100} src={qrCode}/>
            </div>
          </div>
        </div>
        <div className="phone-desc">
          {this.props.description}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(PhonePanel);
