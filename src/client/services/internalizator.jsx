//@flow
import {loadTranslations, setLocale, syncTranslationWithStore} from "react-redux-i18n";
import {dictionary} from "../locale/dictionary";
import _ from "lodash";
import type {Store} from "redux";
import type {State} from "../initial-state";
import type {Action, Dispatch} from "../types/redux";

export default class Internalizator {

  static configureIn18n(store: Store<State, Action, Dispatch>, defaultLocale: string): Store<State, Action, Dispatch> {
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations(dictionary));
    store.dispatch(setLocale(Internalizator.getBrowserLanguage(defaultLocale)));

    return store;
  };

  static getBrowserLanguage(defaultLocale: string): string {
    if (typeof window !== "undefined") {
      const locale = localStorage.getItem("locale");
      if (!locale) {
        const language = (navigator.languages && navigator.languages[0]) || navigator.language;
        const languageWithoutRegionCode = language ? language.toLowerCase().split(/[_-]+/)[0] : "";
        return _.has(dictionary, languageWithoutRegionCode) ? languageWithoutRegionCode : defaultLocale;
      } else {
        return defaultLocale;
      }
    } else {
      return defaultLocale;
    }
  }
}
