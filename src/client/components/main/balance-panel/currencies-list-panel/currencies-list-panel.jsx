// @flow
import * as React from "react";
import type {AmountState, State} from "../../../../initial-state";
import type {Dispatch} from "../../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import CurrencyIcon from "../../../common/currency-icon";

type Props = {
  amountState: AmountState
}

class CurrenciesListPanel extends React.Component<Props> {
  render() {
    const currenciesList = [];
    Object.keys(this.props.amountState).forEach((key: string) => {
      currenciesList.push((
        <div className="currency-item" key={key}>
          <div>
            <CurrencyIcon currencyName={key}/>
          </div>
          <div className="currency-data">
            <div className="currency-name">
              {this.props.amountState[key].label}
            </div>
            <div className="currency-balance">
              {this.props.amountState[key].balance}
            </div>
          </div>
        </div>
      ));
    });
    return (
      <Col className="currencies-panel" xs={12}>
        {currenciesList}
      </Col>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    amountState: state.amountState
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch) => ({dispatch}))(CurrenciesListPanel);
