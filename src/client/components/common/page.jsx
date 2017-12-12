import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../styles/fonts.css"
import "../../styles/main.css"


export default class Page extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
};

