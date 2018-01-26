// @flow
import * as React from "react";
import qtumIcon from "../../images/qtum-icon-32.png";
import inkIcon from "../../images/ink-icon-32.png";
import qtumIconSm from "../../images/qtum-icon-21.png";
import inkIconSm from "../../images/ink-icon-21.png";
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
        icon = isSmall ? qtumIconSm : qtumIcon;
        break;
      case SUPPORTED_CURRENCIES.INK:
        icon = isSmall ? inkIconSm : inkIcon;
        break;
      default:
        icon = qtumIcon;
    }
    return (
      <img src={icon}/>
    );
  }
}
