//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  fetchedUser: null,
  loggedUser: null,
  registrationHistory: null,
  selectedTalk: null,
  newCachedUser: null,
  cachingDone: false,
  userError: null,
  userErrorDetails: null,
};
//#endregion

//#region > User Reducers
const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> registerAction
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        registrationHistory: { ...action.payload },
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
        fetchedUser: { ...action.payload.fetchedUser },
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
        newCachedUser: { ...action.payload.fetchedUser },
        cachingDone: true,
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
        fetchedUser: { ...action.payload.fetchedUser },
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
        selectedTalk: { ...action.payload.talk },
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
        fetchedUser: { ...action.payload.fetchedUser },
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
        fetchedUser: { ...action.payload.fetchedUser },
      };

    case "DELETING_TALK_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    /** Temporary implementation */
    //> loggedUser
    case "SET_LOGGED_USER":
      return {
        ...state,
        loggedUser: action.payload.fetchedUser,
      };

    case "REMOVE_LOGGED_USER":
      return {
        ...state,
        loggedUser: null,
      };

    //> Default
    default:
      return state;
  }
};
//#endregion

//#region > Exports
//> Default Component
export default userReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
