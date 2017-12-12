import React from "react";
import {wrapWithWindow} from "../common/windowed";
import mainLogo from "../../images/logo-md.png";

class HomePanel extends React.Component {
  render() {
    return (
      <div className="main-page-form">
        <div className="main-page-logo-wrapper">
          <img className="main-page-logo" src={mainLogo}/>

        </div>
      </div>
    );
  }
}

export default wrapWithWindow(HomePanel);
