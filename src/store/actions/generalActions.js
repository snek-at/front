//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//#endregion

//#region > Person Actions
/**
 * Get all gitlab servers for registration
 */
const getGitlabServers = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.GENERAL_GITLAB_SERVER_GET_REQUEST });

      const servers = await INTEL_SNEK.general.getGitlabServer();

      dispatch({
        type: Action.GENERAL_GITLAB_SERVER_GET_SUCCESS,
        payload: servers,
      });
    } catch (ex) {
      dispatch({
        type: Action.GENERAL_GITLAB_SERVER_GET_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting person (${personName}) failed`,
          error: ex,
        },
      });
    }
  };
};

//#endregion

export { getPerson, getPersonsBrief };
