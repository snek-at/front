//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//#endregion

//#region > Utils
const extractNameFromPersonSlug = (personSlug) => personSlug.split("-")[1];
//#endregion

//#region > Actions
/**
 * Get a specific talk
 */
const getTalk = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_FETCH_REQUEST });

      const talk = await INTEL_SNEK.talk.getTalk({ id });

      dispatch({
        type: Action.TALK_FETCH_SUCCESS,
        payload: talk,
      });
    } catch (ex) {
      dispatch({
        type: Action.TALK_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting talk id: (${id}) failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Get all talks
 */
const getTalks = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALKS_FETCH_REQUEST });

      const talks = await INTEL_SNEK.talk.getTalks();

      dispatch({
        type: Action.TALKS_FETCH_SUCCESS,
        payload: talks,
      });
    } catch (ex) {
      dispatch({
        type: Action.TALKS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting talks failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Delete a talk
 */
const updateTalk = (
  id,
  nextTalk = {
    title: undefined,
    description: undefined,
    displayUrl: undefined,
    downloadUrl: undefined,
    path: undefined,
    url: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_UPDATE_REQUEST });

      const updatedTalk = await INTEL_SNEK.talk.updateTalk({
        talkId: id,
        toUpdate: { ...nextTalk },
      });

      dispatch({
        type: Action.TALK_UPDATE_SUCCESS,
        payload: updatedTalk,
      });

      return updatedTalk;
    } catch (ex) {
      dispatch({
        type: Action.TALK_UPDATE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Updating talk failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Add a comment to a talk
 */
const addTalkComment = (
  commentOptions = {
    talkId: undefined,
    text: undefined,
    replyToId: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_COMMENT_ADD_REQUEST });

      const state = getState();

      let personName;

      try {
        personName = extractNameFromPersonSlug(state.user.user.person.slug);
      } catch {
        throw new Error("Something went wrong");
      }

      const talk = await INTEL_SNEK.talk.addTalkComment({
        personName,
        commentOptions,
      });

      dispatch({
        type: Action.TALK_COMMENT_ADD_SUCCESS,
        payload: talk,
      });

      return talk;
    } catch (ex) {
      dispatch({
        type: Action.TALK_COMMENT_ADD_FAILURE,
        payload: {
          errorCode: 601,
          message: `Adding talk comment failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Delete a talk comment
 */
const deleteTalkComment = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_COMMENT_DELETE_REQUEST });

      const remainingComments = await INTEL_SNEK.talk.deleteTalkComment({
        commentId: id,
      });

      dispatch({
        type: Action.TALK_COMMENT_DELETE_SUCCESS,
        payload: remainingComments,
      });

      return remainingComments;
    } catch (ex) {
      dispatch({
        type: Action.TALK_COMMENT_DELETE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Deleting talk comment failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Delete a talk
 */
const updateTalkComment = (
  id,
  nextComment = {
    text: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_COMMENT_UPDATE_REQUEST });

      const updatedComment = await INTEL_SNEK.talk.updateTalkComment({
        talkId: id,
        toUpdate: nextComment,
      });

      dispatch({
        type: Action.TALK_COMMENT_UPDATE_SUCCESS,
        payload: updatedComment,
      });

      return updatedComment;
    } catch (ex) {
      dispatch({
        type: Action.TALK_COMMENT_UPDATE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Updating talk comment failed`,
          error: ex,
        },
      });
    }
  };
};
//#endregion

export {
  getTalk,
  getTalks,
  updateTalk,
  addTalkComment,
  deleteTalkComment,
  updateTalkComment,
};
