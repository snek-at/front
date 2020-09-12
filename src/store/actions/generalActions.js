//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//#endregion

//#region > Actions
/**
 * Get all gitlab servers for registration
 */
const getGitlabServers = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.GENERAL_GITLAB_SERVER_FETCH_REQUEST });

      const servers = await INTEL_SNEK.general.getGitlabServer();

      dispatch({
        type: Action.GENERAL_GITLAB_SERVER_FETCH_SUCCESS,
        payload: servers,
      });
    } catch (ex) {
      dispatch({
        type: Action.GENERAL_GITLAB_SERVER_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting gitlab server failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Get all person in a brief form
 */
const getPersonsBrief = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.GENERAL_PERSONS_BRIEF_FETCH_REQUEST });

      const persons = await INTEL_SNEK.person.allBrief();

      console.log(persons);

      dispatch({
        type: Action.GENERAL_PERSONS_BRIEF_FETCH_SUCCESS,
        payload: persons,
      });
    } catch (ex) {
      dispatch({
        type: Action.GENERAL_PERSONS_BRIEF_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: "Getting all person in a brief form failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Get all achievements with collectors
 */
const getAchievements = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.GENERAL_ACHIEVEMENTS_FETCH_REQUEST });

      const achievements = await INTEL_SNEK.achievement.all();

      dispatch({
        type: Action.GENERAL_ACHIEVEMENTS_FETCH_SUCCESS,
        payload: achievements,
      });
    } catch (ex) {
      dispatch({
        type: Action.GENERAL_ACHIEVEMENTS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting achievements failed`,
          error: ex,
        },
      });
    }
  };
};
//#endregion

export { getGitlabServers, getPersonsBrief, getAchievements };

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
