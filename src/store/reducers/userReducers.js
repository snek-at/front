//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  user: { anonymous: undefined, username: undefined, person: undefined },
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> Login
    case Action.USER_LOGIN_REQUEST:
      return state;
    case Action.USER_LOGIN_SUCCESS:
      return {
        user: {
          ...action.payload,
          person: null,
        },
      };
    case Action.USER_LOGIN_FAILURE:
      return {
        user: { anonymous: null, username: null, person: null },
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Logout
    case Action.USER_LOGOUT_REQUEST:
      return state;
    case Action.USER_LOGOUT_SUCCESS:
      return {
        user: { anonymous: true, username: undefined, person: undefined },
      };
    case Action.USER_LOGOUT_FAILURE:
      return {
        user: INIT_STATE.user,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Person
    case Action.USER_PERSON_FETCH_REQUEST:
      return state;
    case Action.USER_PERSON_FETCH_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          person: {
            ...action.payload,
          },
        },
      };
    case Action.USER_PERSON_FETCH_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          person: {
            ...INIT_STATE.user.person,
          },
        },
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    case Action.USER_PERSON_SIGNUP_REQUEST:
      return state;
    case Action.USER_PERSON_SIGNUP_SUCCESS:
      return { ...state };
    case Action.USER_PERSON_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> User Exists Check
    case Action.USER_EXISTS_CHECK_REQUEST:
      return state;
    case Action.USER_EXISTS_CHECK_SUCCESS:
      return { ...state };
    case Action.USER_EXISTS_CHECK_FAILURE:
      return {
        ...state,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };

    default:
      return state;
  }
};
//#endregion

//#region > Exports
export default userReducer;
//#endregion
