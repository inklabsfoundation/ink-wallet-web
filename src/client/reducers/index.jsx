import {combineReducers} from "redux";
import { i18nReducer } from "react-redux-i18n";
import {config} from "./config/config-reducer";

export default combineReducers({
  i18n: i18nReducer,
  config
});
