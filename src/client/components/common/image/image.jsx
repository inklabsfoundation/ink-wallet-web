// @flow
import * as React from "react";
import ImageLoader from "react-load-image";
import spinner from "../../../images/preloader.gif";

const Preloader = () => {
  return <img src={spinner}/>;
};

const Image = (props: Object) =>
  (<ImageLoader {...props}>
    <div/>
    <div/>
    <Preloader/>
  </ImageLoader>);

export default Image;
