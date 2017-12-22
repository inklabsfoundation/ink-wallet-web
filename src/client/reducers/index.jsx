import {combineReducers} from "redux";
import {i18nReducer} from "react-redux-i18n";
import {config} from "./config/config-reducer";
import {creationState} from "./creation/creation-reducer";
import {loginState} from "./login/login-reducer";
import {amountState} from "./amount/amount-reducer";
import {reducer as formReducer} from "redux-form";
import {sendTransactionState} from "./sent-transaction/sent-transaction-reducer";

export default combineReducers({
  i18n: i18nReducer,
  creationState,
  loginState,
  amountState,
  config,
  form: formReducer,
  sendTransactionState
});
