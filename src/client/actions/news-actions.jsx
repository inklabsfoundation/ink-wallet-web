// @flow

import {openRequestFailModal} from "./login-actions";
import type {Dispatch, GetState, ThunkAction} from "../types/redux";
import type {$AxiosXHR} from "axios";
import axios from "axios";

type RequestNewsSuccessAction = {
  type: "REQUEST_NEWS_SUCCESS",
  news: Array<Object>
};

export type NewsAction = RequestNewsSuccessAction;

export const requestNewsSuccess = (news: Array<Object>): RequestNewsSuccessAction => {
  return {
    type: "REQUEST_NEWS_SUCCESS",
    news
  };
};

export const requestNews = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    axios.get(getState().config.newsUrl)
      .then((response: $AxiosXHR<Array<Object>>) => {
        const news: Array<Object> = response.data;
        dispatch(requestNewsSuccess(news));
      }, () => {});
  };
};
