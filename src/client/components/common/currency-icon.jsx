// @flow
import * as React from "react";
import qtumIcon32 from "../../images/qtum-icon-32.png";

type Props = {
  currencyName: string
}

export default class CurrencyIcon extends React.Component<Props> {
  render() {
    const icon: any = qtumIcon32;
    return (
      <img src={icon}/>
    );
  }
}
