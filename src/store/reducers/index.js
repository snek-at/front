//#region > Imports
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { combineReducers } from "redux";
// LoadingBar
import { loadingBarReducer } from "react-redux-loading-bar";

//> Reducers
// User
import userReducers from "./userReducers";
// Person
import personReducers from "./personReducers";
// General
import generalReducers from "./generalReducers";
// Talk
import talkReducer from "./talkReducers";
// Enterprise
import enterpriseReducer from "./enterpriseReducers";

//#endregion

//#region > Config
const rootReducer = combineReducers({
  // Loading bar
  loadingBar: loadingBarReducer,
  // User data
  user: userReducers,
  // Person data
  person: personReducers,
  // General data
  general: generalReducers,
  // Talk data
  talk: talkReducer,
  // Enterprise data
  enterprise: enterpriseReducer,
});
//#endregion

//#region > Exports
//> Default Component
export default rootReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
