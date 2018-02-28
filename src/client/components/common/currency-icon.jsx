// @flow
import * as React from "react";
import qtumIcon from "../../images/qtum-icon.svg";
import inkIcon from "../../images/ink-icon.svg";
import {SUPPORTED_CURRENCIES} from "../../initial-state";

type Props = {
  currencyName: string,
  small: ?boolean
};

export default class CurrencyIcon extends React.Component<Props> {
  render(): React.Node {
    let icon: string = "";
    const isSmall: ?boolean = this.props.small;
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
    const width: string = isSmall ? "22px" : "32px";
    return (
      <img style={{width}} src={icon}/>
    );
  }
}
