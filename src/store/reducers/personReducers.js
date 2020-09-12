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
  profilesProcessed: false,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const personReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> All person types
    // Currently no splitted cases are used because there is no need for
    case Action.PERSON_SETTINGS_UPDATE_REQUEST |
      Action.PERSON_META_LINK_ADD_REQUEST |
      Action.PERSON_META_LINK_DELETE_REQUEST |
      Action.PERSON_PROFILES_FETCH_REQUEST |
      Action.PERSON_PROFILE_ADD_REQUEST |
      Action.PERSON_PROFILE_DELETE_REQUEST |
      Action.PERSON_PROFILE_UPDATE_REQUEST |
      Action.PERSON_INSTAGRAM_POSTS_FETCH_REQUEST |
      Action.PERSON_PROFILES_PROCESS_REQUEST |
      Action.PERSON_FOLLOW_REQUEST |
      Action.PERSON_UNFOLLOW_REQUEST |
      Action.PERSON_LIKE_REQUEST |
      Action.PERSON_UNLIKE_REQUEST |
      Action.PERSON_ACHIEVEMENT_REDEEM_REQUEST |
      Action.PERSON_TALK_ADD_REQUEST |
      Action.PERSON_TALK_DELETE_REQUEST:
      return state;
    case Action.PERSON_SETTINGS_UPDATE_SUCCESS |
      Action.PERSON_META_LINK_ADD_SUCCESS |
      Action.PERSON_META_LINK_DELETE_SUCCESS |
      Action.PERSON_PROFILES_FETCH_SUCCESS |
      Action.PERSON_PROFILE_ADD_SUCCESS |
      Action.PERSON_PROFILE_DELETE_SUCCESS |
      Action.PERSON_PROFILE_UPDATE_SUCCESS |
      Action.PERSON_INSTAGRAM_POSTS_FETCH_SUCCESS |
      Action.PERSON_FOLLOW_SUCCESS |
      Action.PERSON_UNFOLLOW_SUCCESS |
      Action.PERSON_LIKE_SUCCESS |
      Action.PERSON_UNLIKE_SUCCESS |
      Action.PERSON_ACHIEVEMENT_REDEEM_SUCCESS:
      return {
        ...state,
      };
    case Action.PERSON_SETTINGS_UPDATE_FAILURE |
      Action.PERSON_META_LINK_ADD_FAILURE |
      Action.PERSON_META_LINK_DELETE_FAILURE |
      Action.PERSON_PROFILES_FETCH_FAILURE |
      Action.PERSON_PROFILE_ADD_FAILURE |
      Action.PERSON_PROFILE_DELETE_FAILURE |
      Action.PERSON_PROFILE_UPDATE_FAILURE |
      Action.PERSON_INSTAGRAM_POSTS_FETCH_FAILURE |
      Action.PERSON_PROFILES_PROCESS_FAILURE |
      Action.PERSON_FOLLOW_FAILURE |
      Action.PERSON_UNFOLLOW_FAILURE |
      Action.PERSON_LIKE_FAILURE |
      Action.PERSON_UNLIKE_FAILURE |
      Action.PERSON_ACHIEVEMENT_REDEEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Profile processing
    case Action.PERSON_PROFILES_PROCESS_SUCCESS:
      return {
        ...state,
        profilesProcessed: action.payload,
      };
    //> Get person
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
    //> Add talk to person
    case Action.PERSON_TALK_ADD_REQUEST:
      return state;
    case Action.PERSON_TALK_ADD_SUCCESS:
      return {
        ...state,
        fetchedPerson: {
          ...state.fetchedPerson,
          talks: [...state.fetchedPerson.talks, action.payload],
        },
      };
    case Action.PERSON_TALK_ADD_FAILURE:
      return {
        ...state,
        error: action.payload,
        errorDetails: serializeError(action.payload.error),
      };
    //> Add talk to person
    case Action.PERSON_TALK_DELETE_REQUEST:
      return state;
    case Action.PERSON_TALK_DELETE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        fetchedPerson: {
          ...state.fetchedPerson,
          talks: [...action.payload],
        },
      };
    case Action.PERSON_TALK_DELETE_FAILURE:
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
export default personReducer;
//#endregion
