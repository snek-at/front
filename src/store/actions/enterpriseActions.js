//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import { Provider as INTEL_SNEK_E } from "snek-intel/lib/utils/enterprise";
//#endregion

//#region > Actions
/**
 * Get enterprise
 */
const getGeneral = (enterpriseName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.ENTERPRISE_GENERAL_FETCH_REQUEST });

      const enterprise = await INTEL_SNEK_E.general.getEnterprisePageGeneralContent(
        { slug: `e-${enterpriseName}` }
      );

      dispatch({
        type: Action.ENTERPRISE_GENERAL_FETCH_SUCCESS,
        payload: enterprise,
      });
    } catch (ex) {
      dispatch({
        type: Action.ENTERPRISE_GENERAL_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting general enterprise failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Get enterprise projects
 */
const getProjects = (enterpriseName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.ENTERPRISE_PROJECTS_FETCH_REQUEST });

      const projects = await INTEL_SNEK_E.general.getEnterprisePageProjectsContent(
        { slug: `e-${enterpriseName}` }
      );

      dispatch({
        type: Action.ENTERPRISE_PROJECTS_FETCH_SUCCESS,
        payload: projects,
      });
    } catch (ex) {
      dispatch({
        type: Action.ENTERPRISE_PROJECTS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting projects of enterprise failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Get enterprise users
 */
const getUsers = (enterpriseName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.ENTERPRISE_USERS_FETCH_REQUEST });

      const projects = await INTEL_SNEK_E.general.getEnterprisePageUsersContent(
        { slug: `e-${enterpriseName}` }
      );

      dispatch({
        type: Action.ENTERPRISE_USERS_FETCH_SUCCESS,
        payload: projects,
      });
    } catch (ex) {
      dispatch({
        type: Action.ENTERPRISE_USERS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting users of enterprise failed`,
          error: ex,
        },
      });
    }
  };
};
//#endregion

export { getGeneral, getProjects, getUsers };
