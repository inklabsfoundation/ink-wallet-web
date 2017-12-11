import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fonts.css";
import "../../styles/main.css";


export default class Page extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

