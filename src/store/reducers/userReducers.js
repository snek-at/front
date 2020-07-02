import { serializeError } from "serialize-error";

const INIT_STATE = {
  fetchedUser: null,
  registrationHistory: null,
  selectedTalk: null,
  userError: null,
  userErrorDetails: null,
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> registerAction
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        registrationHistory: action.payload,
      };

    case "SIGNUP_FAILED" || "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> writeCacheAction
    case "WRITE_CACHE_SUCCESS":
      return {
        ...state,
      };

    case "WRITE_CACHE_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> readCacheAction
    case "READ_CACHE_SUCCESS":
      return {
        ...state,
        fetchedUser: action.payload.fetchedUser,
      };

    case "READ_CACHE_FAILED" || "READ_CACHE_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> updateCacheAction
    case "UPDATE_CACHE_SUCCESS":
      return {
        ...state,
        fetchedUser: action.payload.fetchedUser,
      };

    case "UPDATE_CACHE_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> saveSettingsActions
    case "SAVE_SETTING_SUCCESS":
      return {
        ...state,
        fetchedUser: action.payload.fetchedUser,
      };

    case "SAVE_SETTING_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> getTalkAction
    case "GET_TALK_SUCCESS":
      return {
        ...state,
        selectedTalk: action.payload.talk,
      };

    case "GET_TALK_FAILED" || "GET_TALK_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> uploadTalkAction
    case "UPLOAD_TALK_SUCCESS":
      return {
        ...state,
        fetchedUser: action.payload.fetchedUser,
      };

    case "UPLOAD_TALK_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> deleteTalkAction
    case "DELETING_TALK_SUCCESS":
      return {
        ...state,
        fetchedUser: action.payload.fetchedUser,
      };

    case "DELETING_TALK_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> Default
    default:
      return state;
  }
};

export default userReducer;
