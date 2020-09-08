//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//#endregion

//#region > Actions
/**
 * Get a specific talk
 */
const getTalk = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALKS_FETCH_REQUEST });

      const talk = await INTEL_SNEK.talk.getTalk({ id });

      dispatch({
        type: Action.TALKS_FETCH_SUCCESS,
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
 * Add a talk
 */
const addTalk = (
  talkOptions = {
    title,
    description,
    displayUrl,
    downloadUrl,
    path,
    url,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_ADD_REQUEST });

      let personName;

      try {
        personName = extractNameFromPersonSlug(state.user.person.slug);
      } catch {
        throw new Error("Something went wrong");
      }

      const talk = await INTEL_SNEK.talk.addTalk({ personName, talkOptions });

      dispatch({
        type: Action.TALK_ADD_SUCCESS,
        payload: talk,
      });

      return talk;
    } catch (ex) {
      dispatch({
        type: Action.TALK_ADD_FAILURE,
        payload: {
          errorCode: 601,
          message: `Adding talk failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Delete a talk
 */
const deleteTalk = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_DELETE_REQUEST });

      const remainingTalks = await INTEL_SNEK.talk.deleteTalk({ talkId: id });

      dispatch({
        type: Action.TALK_DELETE_SUCCESS,
      });

      return remainingTalks;
    } catch (ex) {
      dispatch({
        type: Action.TALK_DELETE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Deleting talk failed`,
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
    title,
    description,
    displayUrl,
    downloadUrl,
    path,
    url,
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
      });

      return updatedTalk;
    } catch (ex) {
      dispatch({
        type: Action.TALK_DELETE_FAILURE,
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
    talkId,
    text,
    replyToId,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.TALK_COMMENT_ADD_REQUEST });

      let personName;

      try {
        personName = extractNameFromPersonSlug(state.user.person.slug);
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
const updateTalk = (
  id,
  nextComment = {
    text,
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

export { getTalk, getTalks, addTalk, deleteTalk, updateTalk };
