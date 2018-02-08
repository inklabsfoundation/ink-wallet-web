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

type Props = {};

class NewsPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.Node {
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
          <div className="news-item">
            <div className="time">
              2018-01-31
            </div>
            <div className="desc">
              <a target="_blank"
                 href="https://finance.yahoo.com/news/inks-blockchain-based-ip-solutions-233000774.html">
                Ink's Blockchain-Based IP Solutions to Revolutionize Creative Industry
              </a>
            </div>
          </div>
          <div className="news-item">
            <div className="time">
              2018-01-26
            </div>
            <div className="desc">
              <a target="_blank"
                 href="https://megapowertech-malaysia.blogspot.my/p/pr-newswire.html?rkey=20180126AE96353&filter=7658">
                Ink Launches INKstone, A Platform For Blockchain App Developers
              </a>
            </div>
          </div>
          <div className="news-item">
            <div className="time">
              2017-12-15
            </div>
            <div className="desc">
              <a target="_blank"
                 href="https://xueqiu.com/8215700657/97563658?from=groupmessage&isappinstalled=0">
                我们想改变整个区块链世界
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {};
};

// eslint-disable-next-line max-len
export default connect(mapStateToProps, (dispatch: Dispatch): Object => ({dispatch}))(NewsPanel);
