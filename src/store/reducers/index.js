//#region > Imports
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { combineReducers } from "redux";
// LoadingBar
import { loadingBarReducer } from "react-redux-loading-bar";

//> Reducers
// User
import userReducer from "./userReducers";
// Person
import personReducer from "./personReducer";
//#endregion

//#region > Config
const rootReducer = combineReducers({
  // Loading bar
  loadingBar: loadingBarReducer,
  // User data
  user: userReducer,
  // Person data
  person: personReducer,
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
