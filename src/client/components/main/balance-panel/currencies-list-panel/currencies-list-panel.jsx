// @flow
import * as React from "react";
import type {AmountState, State} from "../../../../initial-state";
import type {Dispatch} from "../../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import CurrencyIcon from "../../../common/currency-icon";
import {valueFilter} from "../../../../services/amount-helper";

type Props = {
  amountState: AmountState
};

class CurrenciesListPanel extends React.Component<Props> {
  render(): React.Node {
    return (
      <Col className="currencies-panel" xs={12}>
        <div className="currency-item">
          <div>
            <CurrencyIcon small={false} currencyName="QTUM"/>
          </div>
          <div className="currency-data">
            <div className="currency-name">
              {this.props.amountState.QTUM.label}
            </div>
            <div className="currency-balance">
              {valueFilter(this.props.amountState.QTUM.balance)}
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(CurrenciesListPanel);
