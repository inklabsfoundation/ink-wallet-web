// @flow
import * as React from "react";
// $FlowFixMe
import {Col} from "react-bootstrap";
import {Translate} from "react-redux-i18n";
import newsIcon from "../../../images/news-icon.png";
import type {State} from "../../../initial-state";
import type {Dispatch} from "../../../types/redux";
// $FlowFixMe
import {connect} from "react-redux";
import {requestNews} from "../../../actions/news-actions";
import moment from "moment";

type Props = {
  dispatch: Dispatch,
  news: Array<Object>
};

class NewsPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestNews());
  }

  render(): React.Node {
    const news: Array<React.Node> = this.props.news.map((newsItem: Object, idx: number) => {
      return (
        <div className="news-item" key={idx}>
          <div className="time">
            {moment.unix(newsItem.date).format("YYYY-MM-DD")}
          </div>
          <div className="desc">
            <a target="_blank"
               href={newsItem.link}>
              {newsItem.title}
            </a>
          </div>
        </div>);
    });
    return (
      <div className="news-panel">
        <div className="news-inner">
          <div className="news-title-block">
            <Translate value="mainPage.newsTitle"/>
          </div>
          <div className="news-title-icon">
            <img width={25} height={25} src={newsIcon}/>
          </div>
        </div>
        <div className="news-list-block">
          {news}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    news: state.newsState.news
  };
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(NewsPanel);
