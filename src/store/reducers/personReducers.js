//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Action Types
import * as Action from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  fetchedPerson: undefined,
  allPersonBrief: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> Get
    case Action.PERSON_FETCH_REQUEST:
      return state;
    case Action.PERSON_FETCH_SUCCESS:
      return {
        ...state,
        fetchedPerson: {
          ...action.payload,
        },
      };
    case Action.PERSON_FETCH_FAILURE:
      return {
        ...state,
        fetchedPerson: undefined,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Get all brief
    case Action.PERSON_PERSONS_BRIEF_FETCH_REQUEST:
      return state;
    case Action.PERSON_PERSONS_BRIEF_FETCH_SUCCESS:
      return {
        ...state,
        allPersonBrief: action.payload,
      };
    case Action.PERSON_PERSONS_BRIEF_FETCH_FAILURE:
      return {
        ...state,
        allPersonBrief: undefined,
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
