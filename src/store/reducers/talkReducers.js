//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  talks: undefined,
  fetchedTalk: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const talkReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> Talk
    case Action.TALK_FETCH_REQUEST:
      return state;
    case Action.TALK_FETCH_SUCCESS:
      return {
        ...state,
        fetchedTalk: action.payload,
      };
    case Action.TALK_FETCH_FAILURE:
      return {
        ...state,
        fetchedTalk: undefined,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Talks
    case Action.TALKS_FETCH_REQUEST:
      return state;
    case Action.TALKS_FETCH_SUCCESS:
      return {
        ...state,
        talks: action.payload,
      };
    case Action.TALKS_FETCH_FAILURE:
      return {
        ...state,
        talks: undefined,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };

    default:
      return state;
  }
};
//#endregion

//#region > Exports
export default talkReducer;
//#endregion
