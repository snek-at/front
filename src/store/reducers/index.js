//#region > Imports
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { combineReducers } from "redux";
// LoadingBar
import { loadingBarReducer } from "react-redux-loading-bar";

//> Reducers
// Authentication
import authReducer from "./authReducers";
// General
import generalReducer from "./generalReducers";
// User
import userReducer from "./userReducers";
//#endregion

//#region > Config
const rootReducer = combineReducers({
  // Loading bar
  loadingBar: loadingBarReducer,
  // User authentication
  auth: authReducer,
  // General data
  general: generalReducer,
  // User data
  user: userReducer,
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
