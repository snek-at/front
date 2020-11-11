//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  allPersonBrief: undefined,
  gitlabServer: undefined,
  achievements: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const generalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> Get all gitlab server
    case Action.GENERAL_GITLAB_SERVER_FETCH_REQUEST:
      return state;
    case Action.GENERAL_GITLAB_SERVER_FETCH_SUCCESS:
      return {
        ...state,
        gitlabServer: action.payload,
      };
    case Action.GENERAL_GITLAB_SERVER_FETCH_FAILURE:
      return {
        ...state,
        gitlabServer: undefined,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Get all persons brief
    case Action.GENERAL_PERSONS_BRIEF_FETCH_REQUEST:
      return state;
    case Action.GENERAL_PERSONS_BRIEF_FETCH_SUCCESS:
      return {
        ...state,
        allPersonBrief: action.payload,
      };
    case Action.GENERAL_PERSONS_BRIEF_FETCH_FAILURE:
      return {
        ...state,
        allPersonBrief: undefined,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Achievements
    case Action.GENERAL_ACHIEVEMENTS_FETCH_REQUEST:
      return state;
    case Action.GENERAL_ACHIEVEMENTS_FETCH_SUCCESS:
      return {
        ...state,
        achievements: action.payload,
      };
    case Action.GENERAL_ACHIEVEMENTS_FETCH_FAILURE:
      return {
        ...state,
        achievements: undefined,
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
