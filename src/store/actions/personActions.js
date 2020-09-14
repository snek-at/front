//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";

//> Actions
// Functions to send data from the application to the store
import { getPerson as getUserPerson } from "./userActions";
//#endregion

//#region > Utils
const extractNameFromPersonSlug = (personSlug) => personSlug.split("-")[1];
//#endregion

//#region > Actions
/**
 * Get person page for a logged user
 */
const getPerson = (personName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_FETCH_REQUEST });

      const person = await INTEL_SNEK.person.get({ personName });

      dispatch({ type: Action.PERSON_FETCH_SUCCESS, payload: person });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Getting person (${personName}) failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Get person page for a logged user
 */
const updateSettings = (
  nextSettings = {
    avatarImage: undefined,
    bio: undefined,
    display2dCalendar: undefined,
    display3dCalendar: undefined,
    displayEmail: undefined,
    displayProgrammingLanguages: undefined,
    displayRanking: undefined,
    displayWorkplace: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    location: undefined,
    movablePool: undefined,
    status: undefined,
    websiteUrl: undefined,
    workplace: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_SETTINGS_UPDATE_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const person = await INTEL_SNEK.person.updateSettings({
        personName,
        settings: {
          ...nextSettings,
        },
      });

      dispatch({
        type: Action.PERSON_SETTINGS_UPDATE_SUCCESS,
        payload: person,
      });

      await dispatch(getUserPerson(personName));
    } catch (ex) {
      dispatch({
        type: Action.PERSON_SETTINGS_UPDATE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Updating settings failed`,
          error: ex,
        },
      });
    }
  };
};

const addMetaLink = (
  linkOptions = {
    url: undefined,
    linkType: undefined,
    location: undefined,
    imgurDeleteHash: undefined,
    description: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_META_LINK_ADD_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      console.log("OPTIONS", linkOptions);

      const link = await INTEL_SNEK.person.addMetaLink({
        personName,
        linkOptions: {
          ...linkOptions,
        },
      });

      dispatch({ type: Action.PERSON_META_LINK_ADD_SUCCESS, payload: link });

      return link;
    } catch (ex) {
      dispatch({
        type: Action.PERSON_META_LINK_ADD_FAILURE,
        payload: {
          errorCode: 601,
          message: `Adding link failed`,
          error: ex,
        },
      });

      return false;
    }
  };
};

const deleteMetaLink = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_META_LINK_DELETE_REQUEST });

      const link = await INTEL_SNEK.person.deleteMetaLink({
        metaLinkId: id,
      });

      dispatch({ type: Action.PERSON_META_LINK_DELETE_SUCCESS, payload: link });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_META_LINK_DELETE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Deleting link failed`,
          error: ex,
        },
      });
    }
  };
};

const getProfiles = (personName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILES_FETCH_REQUEST });

      const profiles = await INTEL_SNEK.person.profiles({
        personName,
      });

      dispatch({
        type: Action.PERSON_PROFILES_FETCH_SUCCESS,
        payload: profiles,
      });

      return profiles;
    } catch (ex) {
      dispatch({
        type: Action.PERSON_PROFILES_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Fetching profiles failed`,
          error: ex,
        },
      });
    }
  };
};

const addProfile = (
  source = {
    URL: undefined,
    type: undefined,
    authorization: undefined,
    username: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILE_ADD_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const profile = await INTEL_SNEK.person.addProfile({
        personName,
        source,
      });

      dispatch({ type: Action.PERSON_PROFILE_ADD_SUCCESS, payload: profile });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_PROFILE_ADD_FAILURE,
        payload: {
          errorCode: 601,
          message: `Adding profile failed`,
          error: ex,
        },
      });
    }
  };
};

const deleteProfile = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_META_LINK_DELETE_REQUEST });

      const profiles = await INTEL_SNEK.person.deleteProfile({
        profileId: id,
      });

      dispatch({
        type: Action.PERSON_META_LINK_DELETE_SUCCESS,
        payload: profiles,
      });
    } catch (ex) {
      console.log("FAIL", Action.PERSON_META_LINK_DELETE_FAILURE);
      dispatch({
        type: Action.PERSON_META_LINK_DELETE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Deleting link failed`,
          error: ex,
        },
      });
    }
  };
};

const updateProfile = (
  id,
  nextProfile = {
    URL: undefined,
    type: undefined,
    authorization: undefined,
    username: undefined,
    isActive: undefined,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILE_UPDATE_REQUEST });

      console.log(nextProfile, id);

      const profile = await INTEL_SNEK.person.updateProfile({
        profileId: id,
        toUpdate: {
          ...nextProfile,
        },
      });

      dispatch({
        type: Action.PERSON_PROFILE_UPDATE_SUCCESS,
        payload: profile,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_PROFILE_UPDATE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Updating profile failed`,
          error: ex,
        },
      });
    }
  };
};

const getInstagramPosts = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_INSTAGRAM_POSTS_FETCH_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const posts = await INTEL_SNEK.person.getInstagramPosts({
        personName,
      });

      dispatch({
        type: Action.PERSON_INSTAGRAM_POSTS_FETCH_SUCCESS,
        payload: posts,
      });

      return posts;
    } catch (ex) {
      dispatch({
        type: Action.PERSON_INSTAGRAM_POSTS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Fetching instagram posts failed`,
          error: ex,
        },
      });

      return false;
    }
  };
};

const processProfiles = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILES_PROCESS_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const posts = await INTEL_SNEK.person.processProfiles({
        personName,
      });

      await dispatch({
        type: Action.PERSON_PROFILES_PROCESS_SUCCESS,
        payload: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 30000));

      dispatch({
        type: Action.PERSON_PROFILES_PROCESS_SUCCESS,
        payload: false,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_PROFILES_PROCESS_FAILURE,
        payload: {
          errorCode: 601,
          message: `Processing profiles failed`,
          error: ex,
        },
      });
    }
  };
};

const follow = (receiverPersonName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_FOLLOW_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const res = await INTEL_SNEK.social.follow({
        invoker: personName,
        receiver: receiverPersonName,
      });

      dispatch({
        type: Action.PERSON_FOLLOW_SUCCESS,
        payload: res,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_FOLLOW_FAILURE,
        payload: {
          errorCode: 601,
          message: `Following ${receiverPersonName} failed`,
          error: ex,
        },
      });
    }
  };
};

const unfollow = (receiverPersonName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_UNFOLLOW_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const res = await INTEL_SNEK.social.unfollow({
        invoker: personName,
        receiver: receiverPersonName,
      });

      dispatch({
        type: Action.PERSON_UNFOLLOW_SUCCESS,
        payload: res,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_UNFOLLOW_FAILURE,
        payload: {
          errorCode: 601,
          message: `Unfollowing ${receiverPersonName} failed`,
          error: ex,
        },
      });
    }
  };
};

const like = (receiverPersonName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_LIKE_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const res = await INTEL_SNEK.social.like({
        invoker: personName,
        receiver: receiverPersonName,
      });

      dispatch({
        type: Action.PERSON_LIKE_SUCCESS,
        payload: res,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_LIKE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Liking ${receiverPersonName} failed`,
          error: ex,
        },
      });
    }
  };
};

const unlike = (receiverPersonName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_UNLIKE_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const res = await INTEL_SNEK.social.unlike({
        invoker: personName,
        receiver: receiverPersonName,
      });

      dispatch({
        type: Action.PERSON_UNLIKE_SUCCESS,
        payload: res,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_UNLIKE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Unliking ${receiverPersonName} failed`,
          error: ex,
        },
      });
    }
  };
};

/**
 * Redeem a achievement with sequence
 */
const redeemAchievement = (sequence) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_ACHIEVEMENT_REDEEM_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.user.person.slug);

      const res = await INTEL_SNEK.achievement.redeem({
        personName,
        sequence,
      });

      if (res.ok) {
        dispatch({
          type: Action.PERSON_ACHIEVEMENT_REDEEM_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: Action.PERSON_ACHIEVEMENT_REDEEM_FAILURE,
          payload: {
            errorCode: 601,
            message: `Redeeming achievement failed. Good try but try again`,
          },
        });
      }

      return res;
    } catch (ex) {
      dispatch({
        type: Action.PERSON_ACHIEVEMENT_REDEEM_FAILURE,
        payload: {
          errorCode: 601,
          message: `Redeeming achievement failed`,
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
      dispatch({ type: Action.PERSON_TALK_ADD_REQUEST });

      const state = getState();

      let personName;

      try {
        personName = extractNameFromPersonSlug(state.user.user.person.slug);
      } catch {
        throw new Error("Something went wrong");
      }

      const talk = await INTEL_SNEK.talk.addTalk({ personName, talkOptions });

      dispatch({
        type: Action.PERSON_TALK_ADD_SUCCESS,
        payload: talk,
      });

      return talk;
    } catch (ex) {
      dispatch({
        type: Action.PERSON_TALK_ADD_FAILURE,
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
      dispatch({ type: Action.PERSON_TALK_DELETE_REQUEST });

      const remainingTalks = await INTEL_SNEK.talk.deleteTalk({ talkId: id });

      dispatch({
        type: Action.PERSON_TALK_DELETE_SUCCESS,
        payload: remainingTalks,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_TALK_DELETE_FAILURE,
        payload: {
          errorCode: 601,
          message: `Deleting talk failed`,
          error: ex,
        },
      });
    }
  };
};

//#endregion
//#region > Exports
export {
  getPerson,
  updateSettings,
  addMetaLink,
  deleteMetaLink,
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  getInstagramPosts,
  processProfiles,
  follow,
  unfollow,
  like,
  unlike,
  redeemAchievement,
  addTalk,
  deleteTalk,
};
//#endregion
