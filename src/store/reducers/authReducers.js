//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  loggedUser: { anonymous: true },
  authError: null,
  authErrorDetails: null,
};
//#endregion

//#region > Reducers
const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> LOGIN
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedUser: { ...action.payload, anonymous: false },
        authErrorDetails: null,
      };

    case "LOGIN_ANON_SUCCESS":
      return {
        ...state,
        loggedUser: undefined,
        loggedUser: { anonymous: true },
        authErrorDetails: null,
      };

    case "LOGIN_FAILED" || "LOGIN_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> LOGOUT
    case "LOGOUT_SUCCESS":
      return INIT_STATE;

    case "LOGOUT_FAILED" || "LOGIN_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    default:
      return state;
  }
};
//#endregion

//#region > Exports
//> Default Component
export default authReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
