import { serializeError } from "serialize-error";

const INIT_STATE = {
  allRegisteredUsernames: null,
  allGitlabServers: [],
  generatedIntelData: null,
  generalError: null,
  generalErrorDetails: null,
};

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

    //> getAllPageUrlsAction
    case "GET_APP_PAGE_URLS_SUCCESS":
      return {
        ...state,
        allRegisteredUsernames: action.payload.urls,
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

export default generalReducer;
