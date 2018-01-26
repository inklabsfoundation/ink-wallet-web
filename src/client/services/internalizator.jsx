//@flow
import {loadTranslations, setLocale, syncTranslationWithStore} from "react-redux-i18n";
import {dictionary, LANG_LABELS} from "../locale/dictionary";
import type {Store} from "redux";
import type {State} from "../initial-state";
import type {Action, Dispatch} from "../types/redux";
import * as _ from "lodash";
import {isClientSide} from "./is-client-side-helper";

export default class Internalizator {

  static configureIn18n(store: Store<State, Action, Dispatch>, defaultLocale: string): Store<State, Action, Dispatch> {
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations(dictionary));
    store.dispatch(setLocale(Internalizator.getBrowserLanguage(defaultLocale)));

    return store;
  }

  static getBrowserLanguage(defaultLocale: string): string {
    if (isClientSide()) {
      const locale = localStorage.getItem("locale");
      if (!locale) {
        const language = (navigator.languages && navigator.languages[0]) || navigator.language;
        const languageWithoutRegionCode = language ? language.toLowerCase().split(/[_-]+/)[0] : "";
        return _.has(dictionary, languageWithoutRegionCode) ? languageWithoutRegionCode : defaultLocale;
      } else {
        return locale;
      }
    } else {
      return defaultLocale;
    }
  }

  static getLangLabel(lang: string): string {
    let label: string = "";
    Object.keys(LANG_LABELS).forEach((key: string) => {
      if (key === lang) {
        label = LANG_LABELS[key];
      }
    });

    return label;
  }
}
