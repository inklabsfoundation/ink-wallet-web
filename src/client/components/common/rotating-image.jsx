import * as React from "react";

export default class RotatingImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: false
    };
    this.rotatingDone = this.rotatingDone.bind(this);
  }
  componentDidMount() {
    const elm = this.image;
    elm.addEventListener("animationend", this.rotatingDone);
  }
  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener("animationend", this.rotatingDone);
  }

  rotatingDone() {
    this.setState(() => {
      return {
        rotate: false
      };
    });
  }
  render() {
    const { rotate } = this.state;

    return (
      <img
        // eslint-disable-next-line react/prop-types
        src={this.props.image}
        ref={elm => {
          this.image = elm;
        }}
        width={20}
        height={16}
        onClick={() => this.setState({ rotate: true })}
        className={rotate ? "rotate" : ""}
      />
    );
  }
}
