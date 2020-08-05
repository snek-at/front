//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//#endregion

//#region > Constant Variables
const INIT_STATE = {
  allUserSearchItems: null,
  allGitlabServers: [],
  generatedIntelData: null,
  generalError: null,
  generalErrorDetails: null,
};
//#endregion

//#region > Reducers
const generalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> appendSourceObjectsAction
    case "APPEND_SOURCE_OBJECTS_SUCCESS":
      return {
        ...state,
      };

    case "APPEND_SOURCE_OBJECTS_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> fetchGitLabServersAction
    case "FETCH_GITLAB_SERVER_SUCCESS":
      return {
        ...state,
        allGitlabServers: action.payload.gitLabServers,
      };

    case "FETCH_GITLAB_SERVER_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> getDataAction
    case "GET_DATA_SUCCESS":
      return {
        ...state,
        generatedIntelData: action.payload,
      };

    case "GET_DATA_ERROR":
      return {
        ...state,
        authError: action.payload,
        authErrorDetails: serializeError(action.payload.error),
      };

    //> getUserSearchItems
    case "GET_APP_PAGE_URLS_SUCCESS":
      return {
        ...state,
        allUserSearchItems: action.payload.items,
      };

    case "GET_APP_PAGE_URLS_ERROR":
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
export default generalReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
