/* eslint-disable react/jsx-handler-names */
// @flow
import * as React from "react";
import {Translate} from "react-redux-i18n";
import type {Dispatch} from "../../../types/redux";
import {Button, Col, Grid, Modal, Row} from "react-bootstrap";
// $FlowFixMe
import {Field, reduxForm} from "redux-form";


type Props = {
  dispatch: Dispatch,
  handleSubmit: Function
}

let PrepareTransactionForm = (props: Props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <Grid>
          <Row>
            <Col className="input-section" xs={12}>
              <label htmlFor="to">To</label>
              <Field name="to" component="input" type="text"/>
            </Col>
          </Row>
          <Row>
            <Col className="input-section" xs={12}>
              <label htmlFor="amount">Amount</label>
              <Field name="amount" component="input" type="text"/>
            </Col>
          </Row>
          <Row>
            <Col className="input-section" xs={12}>
              <label htmlFor="desc">Description</label>
              <Field name="desc" component="textarea" type="text"/>
            </Col>
          </Row>
          <Row>
            <Col className="input-section" xs={12}>
              <label htmlFor="fee">Fees: 0.003</label>
            </Col>
          </Row>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit">Confirm</Button>
      </Modal.Footer>
    </form>
  );
};

export default PrepareTransactionForm = reduxForm({form: "PrepareTransactionForm"})(PrepareTransactionForm);
