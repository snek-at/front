//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  gitlabServer: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const generalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> Get all gitlab server
    case Action.GENERAL_GITLAB_SERVER_GET_REQUEST:
      return state;
    case Action.GENERAL_GITLAB_SERVER_GET_FAILURE:
      return {
        ...state,
        gitlabServer: action.payload,
      };
    case Action.GENERAL_GITLAB_SERVER_GET_SUCCESS:
      return {
        ...state,
        gitlabServer: undefined,
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
