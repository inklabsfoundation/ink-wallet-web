// @flow
import * as React from "react";
import qtumIcon from "../../images/qtum-icon-32.png";
import inkIcon from "../../images/ink-icon-32.png";
import {SUPPORTED_CURRENCIES} from "../../initial-state";

type Props = {
  currencyName: string
}

export default class CurrencyIcon extends React.Component<Props> {
  render() {
    let icon: string = "";
    switch (this.props.currencyName) {
      case SUPPORTED_CURRENCIES.QTUM:
        icon = qtumIcon;
        break;
      case SUPPORTED_CURRENCIES.INK:
        icon = inkIcon;
        break;
      default:
        icon = qtumIcon;
    }
    return (
      <img src={icon}/>
    );
  }
}
