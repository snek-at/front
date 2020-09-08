//#region > Registration Actions
/**
 * Append Source Objects
 *
 * @param sourceList A source object
 * @description Hands source list over to intel
 */
const appendSourceObjectsAction = (sourceList) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();

      intel.appendList(sourceList);

      dispatch({
        type: "APPEND_SOURCE_OBJECTS_SUCCESS",
        payload: {},
      });
    } catch (ex) {
      dispatch({
        type: "APPEND_SOURCE_OBJECTS_ERROR",
        payload: {
          errorCode: 602,
          message: "Appending source objects failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Fetch GitLab Servers
 *
 * @description Retrieves a list of available GitLab servers
 */
const fetchGitLabServersAction = () => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return session.tasks.general
        .gitlabServer()
        .then(({ data }) => {
          const gitLabServers = data?.page?.supportedGitlabs;

          dispatch({
            type: "FETCH_GITLAB_SERVER_SUCCESS",
            payload: { gitLabServers },
          });
        })
        .catch((ex) =>
          dispatch({
            type: "FETCH_GITLAB_SERVER_ERROR",
            payload: { error: ex },
          })
        );
    } catch (ex) {
      dispatch({
        type: "FETCH_GITLAB_SERVER_ERROR",
        payload: {
          errorCode: 605,
          message: "Fetching GitLab server failed",
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Data Handling Actions
/**
 * Get intel data
 *
 * @description Retrieves data from current applied source list
 */
const getDataAction = () => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();

      intel
        .get()
        .then((res) => dispatch({ type: "GET_DATA_SUCCESS", payload: res }))
        .catch((ex) =>
          dispatch({ type: "GET_DATA_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "GET_DATA_ERROR",
        payload: {
          errorCode: 603,
          message: "Getting intel data failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Get all users
 *
 * @description Retrieves a list of all users
 */
const getUserSearchItems = () => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return await session.tasks.general
        .allUserPageUrls()
        .then((res) => {
          dispatch({
            type: "GET_APP_PAGE_URLS_SUCCESS",
            payload: { items: res.data.page.children },
          });
        })
        .catch((ex) =>
          dispatch({ type: "GET_APP_PAGE_URLS_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "GET_APP_PAGE_URLS_ERROR",
        payload: {
          errorCode: 616,
          message: "Getting all page urls failed",
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Exports
//> Default Component
export {
  appendSourceObjectsAction,
  getDataAction,
  getUserSearchItems,
  fetchGitLabServersAction,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
