// @flow
import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import type {State} from "../../initial-state";
import type {Dispatch} from "../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import AssetsTransactionsList from "./assets-transactions-list";
import "react-dates/initialize";
// $FlowFixMe
import "react-dates/lib/css/_datepicker.css";
import {DateRangePicker} from "react-dates";
import moment from "moment";
import rightArrow from "../../images/right-arrow.png";
import leftArrow from "../../images/left-arrow.png";
import {isClientSide} from "../../services/is-client-side-helper";
import {I18n} from "react-redux-i18n";

type Props = {
  dispatch: Dispatch,
  routeParams: Object,
  i18n: Object
};

type FocusedDateInput = "START_DATE" | "END_DATE" | null;

type AssetsDetailsState = {
  activeTab: string,
  startDate: ?moment,
  endDate: ?moment,
  focusedDateInput: FocusedDateInput
};

export const ASSETS_DETAILS_TABS = {
  ALL: "ALL",
  SEND: "SEND",
  RECEIVED: "RECEIVED"
};

class AssetsTransactionsPanel extends React.Component<Props, AssetsDetailsState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: ASSETS_DETAILS_TABS.ALL,
      startDate: null,
      endDate: null,
      focusedDateInput: null,
    };
    (this: any).handleNavClick = this.handleNavClick.bind(this);
    (this: any).handleDatePickerLocale = this.handleDatePickerLocale.bind(this);
  }

  handleNavClick(tab: string) {
    this.setState({activeTab: tab});
  }

  handleDatePickerLocale() {
    if (isClientSide()) {
      const locale: ?string = this.props.i18n.locale;
      moment.locale(locale ? locale.replace("zh", "zh-cn") : "en");
    }
  }

  render(): React.Node {
    const activeTab: string = this.state.activeTab;
    this.handleDatePickerLocale();
    return (
      <div>
        <div className="assets-transactions-panel">
          <div className="assets-transactions-controls">
            <div className="assets-transactions-tab-btns">
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.ALL ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.ALL)}>
                <Translate value="assetsDetails.allTabLabel"/>
              </div>
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.SEND ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.SEND)}>
                <Translate value="assetsDetails.sendTabLabel"/>
              </div>
              <div className={`assets-transactions-btn ${activeTab === ASSETS_DETAILS_TABS.RECEIVED ? "active" : ""}`}
                   onClick={(): void => this.handleNavClick(ASSETS_DETAILS_TABS.RECEIVED)}>
                <Translate value="assetsDetails.receivedTabLabel"/>
              </div>
            </div>
            <div className="assets-transactions-time-panel">
              <div>
                <DateRangePicker
                  startDate={this.state.startDate}
                  startDateId="Date1"
                  endDate={this.state.endDate}
                  endDateId="Date2"
                  onDatesChange={({startDate, endDate}: Object): void => this.setState({startDate, endDate})}
                  focusedInput={this.state.focusedDateInput}
                  anchorDirection="right"
                  small={true}
                  startDatePlaceholderText={I18n.t("assetsDetails.startDatePlaceholderText")}
                  endDatePlaceholderText={I18n.t("assetsDetails.endDatePlaceholderText")}
                  isOutsideRange={(): boolean => false}
                  enableOutsideDays={true}
                  noBorder={true}
                  firstDayOfWeek={1}
                  navPrev={<img className="nav-arrow" src={leftArrow}/>}
                  navNext={<img className="nav-arrow" src={rightArrow}/>}
                  customArrowIcon={(<span className="date-divider">-</span>)}
                  displayFormat="DD/MM/YYYY"
                  onFocusChange={(focusedDateInput: FocusedDateInput): void => this.setState({focusedDateInput})}
                />
              </div>
            </div>
          </div>
        </div>
        <AssetsTransactionsList
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          routeParams={this.props.routeParams}
          tab={this.state.activeTab}/>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    i18n: state.i18n
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(AssetsTransactionsPanel);
