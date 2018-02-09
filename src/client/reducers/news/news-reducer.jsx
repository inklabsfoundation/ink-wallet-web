// @flow
import type {ConfigState, NewsState} from "../../initial-state";
import {initialState} from "../../initial-state";
import type {NewsAction} from "../../actions/news-actions";


export const newsState = (store: NewsState = initialState.newsState,
                       action: NewsAction): NewsState => {
  switch (action.type) {
    case "REQUEST_NEWS_SUCCESS":
      return {
        ...store,
        news: action.news
      };
  }
  return store;
};
