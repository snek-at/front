//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  enterprise: {
    general: undefined,
    projects: undefined,
    users: undefined,
  },
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const generalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> General Enterprise
    case Action.ENTERPRISE_GENERAL_FETCH_REQUEST:
      return state;
    case Action.ENTERPRISE_GENERAL_FETCH_SUCCESS:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          general: action.payload,
        },
      };
    case Action.ENTERPRISE_GENERAL_FETCH_FAILURE:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          general: undefined,
        },
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Enterprise Projects
    case Action.ENTERPRISE_PROJECTS_FETCH_REQUEST:
      return state;
    case Action.ENTERPRISE_PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          projects: action.payload,
        },
      };
    case Action.ENTERPRISE_PROJECTS_FETCH_FAILURE:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          projects: undefined,
        },
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Enterprise Users
    case Action.ENTERPRISE_USERS_FETCH_REQUEST:
      return state;
    case Action.ENTERPRISE_USERS_FETCH_SUCCESS:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          users: action.payload,
        },
      };
    case Action.ENTERPRISE_USERS_FETCH_FAILURE:
      return {
        ...state,
        enterprise: {
          ...state.enterprise,
          users: undefined,
        },
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };

    default:
      return state;
  }
};
//#endregion

//#region > Exports
export default generalReducer;
//#endregion
