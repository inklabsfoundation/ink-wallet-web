/* eslint-disable new-cap */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {Button, Col, Modal, Row} from "react-bootstrap";
// $FlowFixMe
import {Field, reduxForm, SubmissionError} from "redux-form";
import {SHA256} from "crypto-js";
import {errorBlock} from "../prepare-transaction-form/prepare-transaction-form";

type Props = {
  dispatch: Dispatch,
  tokenType: string,
  address: string,
  amount: number,
  fee: number,
  description: string,
  passwordHash: string,
  submitting: boolean,
  solt: string,
  handleSubmit: Function,
  onSubmit: Function
}

const submit = (values: Object, dispatch: Dispatch, props: Props) => {
  if (!values.password) {
    throw new SubmissionError({
      password: "sendTransaction.confirmForm.errors.passwordIsEmpty"
    });
  } else if (SHA256(values.password + props.solt).toString() !== props.passwordHash) {
    throw new SubmissionError({
      password: "sendTransaction.confirmForm.errors.passwordIsIncorrect"
    });
  }
  //TODO Fix this dirty hack
  dispatch(props.onSubmit(values));
};

const renderPassword = ({input, meta: {touched, error}}) => (
  <div>
    <div className="password-input-block">
      <input {...input} type="password"
             className="input"/>
    </div>
    <div className="error-block-wrapper">
      {touched && error
        ?
        errorBlock({message: error})
        : ""
        }
    </div>
  </div>
);

let PrepareConfirationForm = (props: Props) => (
  <form onSubmit={props.handleSubmit(submit)}>
    <Modal.Body>
      <Row className="confirm-transaction-row">
        <Col className="label" xs={2}>
          <Translate value="sendTransaction.confirmForm.token"/>
        </Col>
        <Col className="data" xs={10}>
          {props.tokenType}
        </Col>
      </Row>
      <Row className="confirm-transaction-row">
        <Col className="label" xs={2}>
          <Translate value="sendTransaction.confirmForm.to"/>
        </Col>
        <Col className="data" xs={10}>
          {props.address}
        </Col>
      </Row>
      <Row className="confirm-transaction-row">
        <Col className="label" xs={2}>
          <Translate value="sendTransaction.confirmForm.amount"/>
        </Col>
        <Col className="data" xs={10}>
          {props.amount}
        </Col>
      </Row>
      <Row className="confirm-transaction-row">
        <Col className="label" xs={2}>
          <Translate value="sendTransaction.confirmForm.description"/>
        </Col>
        <Col className="data" xs={10}>
          {props.description}
        </Col>
      </Row>
      <Row className="confirm-transaction-row">
        <Col className="label" xs={2}>
          <Translate value="sendTransaction.confirmForm.fees"/>
        </Col>
        <Col className="data" xs={10}>
          {props.fee} Qtum
        </Col>
      </Row>
    </Modal.Body>
    <hr/>
    <Modal.Body className="password-body">
      <Row className="confirm-transaction-password-row">
        <Col className="label" xs={12}>
          <Translate value="sendTransaction.confirmForm.inputPassword"/>
        </Col>
      </Row>
      <Row className="confirm-transaction-input-password-row">
        <Field name="password" component={renderPassword}/>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={props.submitting}
              className="confirm-button primary-red-btn" type="submit">
        <Translate value="sendTransaction.confirmForm.confirmBtn"/>
      </Button>
    </Modal.Footer>
  </form>
);

PrepareConfirationForm = reduxForm(
  {
    form: "PrepareTransactionForm"
  })(PrepareConfirationForm);

export default PrepareConfirationForm;
