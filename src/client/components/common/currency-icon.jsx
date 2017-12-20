// @flow
import * as React from "react";
import qtumIcon32 from "../../images/qtum-icon-32.png";

type Props = {
  currencyName: string
}

export default class CurrencyIcon extends React.Component<Props> {
  render() {
    let icon: any = {};
    switch (this.props.currencyName) {
      case "QTUM":
        icon = qtumIcon32;
        break;
      default:
        icon = qtumIcon32;
    }
    return (
      <img src={icon}/>
    );
  }
}
