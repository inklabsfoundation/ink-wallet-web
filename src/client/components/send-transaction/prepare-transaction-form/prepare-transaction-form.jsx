/* eslint-disable react/jsx-handler-names,react/prop-types,no-nested-ternary */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {Dispatch} from "../../../types/redux";
import {Button, ButtonToolbar, Col, DropdownButton, MenuItem, Modal, Row} from "react-bootstrap";
// $FlowFixMe
import {Field, reduxForm, formValueSelector} from "redux-form";
// $FlowFixMe
import {connect} from "react-redux";
import inputIcon from "../../../images/copy-icon-2.png";
import alertIcon from "../../../images/alert-notice.png";
import Slider from "rc-slider";
// $FlowFixMe
import "rc-slider/assets/index.css";
import {Address} from "@evercode-lab/qtumcore-lib";
import {SUPPORTED_CURRENCIES} from "../../../initial-state";
import type {State} from "../../../initial-state";

type Props = {
  dispatch: Dispatch,
  handleSubmit: Function,
  qtumAmount: number,
  isStandart: boolean,
  feeCoef: number,
  to: string,
  submitting: boolean,
  fields: Object,
  recommendedFee: number,
  tokenRecommendedFee: number,
  inkAmount: number,
  token: string
};

const FEE_ORDER_OFFSET = 6;
const DUST_AMOUNT =  1E-9;
const DUST_PRECISION =  9;

export const selectFeeValue = (feeConst: number, feeCoef: number): number => {
  // eslint-disable-next-line no-magic-numbers
  const feeDifference = ((1 - feeConst) / 100);
  feeCoef = (feeCoef ? feeCoef : 0);
  return +(feeConst + (feeDifference * feeCoef)).toFixed(FEE_ORDER_OFFSET);
};

export const STANDART_FEE: number = 0.1;
export const STANDART_TOKEN_FEE: number = 0.1;

type SliderProps = {
  disabled: boolean,
  input: Object
};

const renderSlider = (props: SliderProps): React.Node => (
  <Slider {...props.input} disabled={props.disabled}/>
);

type ErrorLabelProps = {
  message: any
};

export const errorBlock = (props: ErrorLabelProps): React.Node => (
  <div className="error-block">
    <div className="error-image">
      <img src={alertIcon} width={22}/>
    </div>
    <div className="error-label">
      <Translate value={props.message}/>
    </div>
  </div>
);

const validate = (values: Object, props: Object): Object => {
  const isQtumSelected : boolean = values.token === SUPPORTED_CURRENCIES.QTUM;
  const recommendedFee: number = isQtumSelected ?
    props.recommendedFee : props.tokenRecommendedFee;
  const amount = isQtumSelected ?
    props.qtumAmount : props.inkAmount;
  const errors: Object = {};
  if (!values.to) {
    errors.to = "sendTransaction.prepareForm.errors.emptyAddress";
  } else if (!Address.isValid(values.to)) {
    errors.to = "sendTransaction.prepareForm.errors.invalidAddress";
  }
  const precisionStr: string = (values.amount + "").split(".")[1];
  if (!values.amount) {
    errors.amount = "sendTransaction.prepareForm.errors.emptyAmount";
  } else if (isNaN(+values.amount)) {
    errors.amount = "sendTransaction.prepareForm.errors.invalidAmount";
  } else if (+values.amount < DUST_AMOUNT) {
    errors.amount = "sendTransaction.prepareForm.errors.dustAmount";
  } else if (precisionStr && precisionStr.length > DUST_PRECISION) {
    errors.amount = "sendTransaction.prepareForm.errors.dustPrecision";
  } else {
    const fee: number = values.isStandart === "1"
      ? (isQtumSelected ? STANDART_FEE : STANDART_TOKEN_FEE)
      : selectFeeValue(recommendedFee, +values.feeCoef);
    if (amount < ((+values.amount) + (+fee))) {
      errors.amount = "sendTransaction.prepareForm.errors.amountLow";
    }
  }

  return errors;
};

const renderAddress = ({input, toValue, meta: {touched, error}}: Object): React.Node => (
  <div className="input-section-wrapper">
    <div>
      <label htmlFor="to">
        <Translate value="sendTransaction.prepareForm.to"/>
      </label>
      <div className="input-address">
        <input {...input} className="address-input" type="text"/>
        {!toValue
          ? <div className="placeholder">
            <Translate value="sendTransaction.prepareForm.amountPlaceholder"/>
          </div>
          : ""}
        <div className="copy">
          <div className="copy-inner">
            <img width={25} height={27} src={inputIcon}/>
          </div>
        </div>
      </div>
    </div>
    {(touched && error) &&
      <div className="error-block-wrapper">
        {errorBlock({message: error})}
      </div>
    }
  </div>
);

const renderAmount = ({input, meta: {touched, error}}: Object): React.Node => (
  <div className="input-section-wrapper">
    <div>
      <label htmlFor="amount">
        <Translate value="sendTransaction.prepareForm.amount"/>
      </label>
      <input {...input} name="amount" type="text"/>
    </div>
    {(touched && error) &&
      <div className="error-block-wrapper">
        {errorBlock({message: error})}
      </div>
    }
  </div>
);

const renderTokenDropdown = (props: Object): React.Node => (
  <DropdownButton className="token" title={props.input.value} name="token"
                  {...props.input} id="token-type">
    <MenuItem
      eventKey="1"
      onClick={(): void => props.input.onChange(SUPPORTED_CURRENCIES.QTUM)}>
      Qtum
    </MenuItem>
    <MenuItem
      eventKey="2"
      onClick={(): void => props.input.onChange(SUPPORTED_CURRENCIES.INK)}>
      Ink
    </MenuItem>
  </DropdownButton>
);

let PrepareTransactionForm = (props: Props): React.Node => {
  const isQtumSelected : boolean = props.token === SUPPORTED_CURRENCIES.QTUM;
  const recommendedFee: number = isQtumSelected ?
    props.recommendedFee : props.tokenRecommendedFee;
  const amount: number = isQtumSelected ?
    props.qtumAmount : props.inkAmount;
  return (
    <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <Row>
          <Col className="input-section" xs={3}>
            <label htmlFor="token">
              <Translate value="sendTransaction.prepareForm.token"/>
            </label>
            <ButtonToolbar className="token-dropdown">
              <Field name="token" component={renderTokenDropdown}/>
            </ButtonToolbar>
          </Col>
          <Col xs={9} className="available-amount-block">
            <div className="available-amount-wrapper">
              <div className="available-amount-element">
                <Translate value="sendTransaction.prepareForm.availableAmount"/> {amount}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="input-section" xs={12}>
            <Field name="to" toValue={props.to} component={renderAddress}/>
          </Col>
        </Row>
        <Row>
          <Col className="input-section" xs={12}>
            <Field name="amount" component={renderAmount}/>
          </Col>
        </Row>
        <Row>
          <Col className="input-section" xs={12}>
            <label htmlFor="desc">
              <Translate value="sendTransaction.prepareForm.description"/>
            </label>
            <Field name="desc" component="textarea" type="text"/>
          </Col>
        </Row>
        <Row>
          <Col className="input-section" xs={12}>
            <label htmlFor="fee">
              <Translate value="sendTransaction.prepareForm.fee.label"/>
            </label>
            <Col xs={12} className="column-wrapper fee-radio-wrapper">
              <Field
                className="radio"
                name="isStandart"
                component="input"
                type="radio"
                value="1"
                id="is-standart"
              />
              <label htmlFor="is-standart">
                <div className="radio-label">
                  <Translate value="sendTransaction.prepareForm.fee.standart"/>
                </div>
                <div className="fee-value">{STANDART_FEE} Qtum</div>
              </label>
            </Col>
            <Col xs={12} className="column-wrapper">
              <Field
                className="radio"
                name="isStandart"
                component="input"
                type="radio"
                value="0"
                id="is-custom"
              />
              <label htmlFor="is-custom">
                <div className="radio-label">
                  <Translate value="sendTransaction.prepareForm.fee.custom"/>
                </div>
                <div className="fee-value">
                  {selectFeeValue(recommendedFee, props.feeCoef)} Qtum
                </div>
              </label>
            </Col>
            <Col xs={12} className="column-wrapper">
              <div className={`slider-wrapper ${!props.isStandart ? "active" : ""}`}>
                <div className="slow-label">
                  <Translate value="sendTransaction.prepareForm.fee.slow"/>
                </div>
                <div className="slider">
                  <Field defaultValue={10}
                         name="feeCoef" disabled={props.isStandart}
                         component={renderSlider}/>
                </div>
                <div className="quick-label">
                  <Translate value="sendTransaction.prepareForm.fee.quick"/>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={props.submitting}
                className="confirm-button primary-red-btn" type="submit">Confirm</Button>
      </Modal.Footer>
    </form>
  );
};
const selector = formValueSelector("PrepareTransactionForm");

// eslint-disable-next-line max-len
PrepareTransactionForm = reduxForm({form: "PrepareTransactionForm", validate})(PrepareTransactionForm);

PrepareTransactionForm = connect((state: State): Object => {
  const isStandart = selector(state, "isStandart");
  return {
    initialValues: {
      isStandart: "1",
      token: SUPPORTED_CURRENCIES.INK
    },
    isStandart: isStandart === "1",
    feeCoef: selector(state, "feeCoef"),
    to: selector(state, "to"),
    token: selector(state, "token")
  };
})(PrepareTransactionForm);

export default PrepareTransactionForm;
