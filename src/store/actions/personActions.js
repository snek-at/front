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
 * Get person page for a logged user
 */
const updateSettings = (
  nextSettings = {
    avatarImage,
    bio,
    display2dCalendar,
    display3dCalendar,
    displayEmail,
    displayProgrammingLanguages,
    displayRanking,
    displayWorkplace,
    email,
    firstName,
    lastName,
    location,
    movablePool,
    status,
    websiteUrl,
    workplace,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_SETTINGS_UPDATE_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

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
    url,
    linkType,
    location,
    imgurDeleteHash,
    description,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_META_LINK_ADD_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const link = await INTEL_SNEK.person.addMetaLink({
        personName,
        linkOptions: {
          ...linkOptions,
        },
      });

      dispatch({ type: Action.PERSON_META_LINK_ADD_SUCCESS, payload: link });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_META_LINK_ADD_FAILURE,
        payload: {
          errorCode: 601,
          message: `Adding link failed`,
          error: ex,
        },
      });
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

const getProfiles = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILES_FETCH_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const profiles = await INTEL_SNEK.person.profiles({
        personName,
      });

      dispatch({
        type: Action.PERSON_PROFILES_FETCH_SUCCESS,
        payload: profiles,
      });
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

const addProfile = (source = { url, type, authorization, username }) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILE_ADD_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const profile = await INTEL_SNEK.person.addProfile({
        personName,
        source: {
          ...source,
        },
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
    avatarImage,
    bio,
    display2dCalendar,
    display3dCalendar,
    displayEmail,
    displayProgrammingLanguages,
    displayRanking,
    displayWorkplace,
    email,
    firstName,
    lastName,
    location,
    movablePool,
    status,
    websiteUrl,
    workplace,
  }
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILE_UPDATE_REQUEST });

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

const getInstagramPosts = (id) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_INSTAGRAM_POSTS_FETCH_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const posts = await INTEL_SNEK.person.getInstagramPosts({
        personName,
      });

      dispatch({
        type: Action.PERSON_INSTAGRAM_POSTS_FETCH_SUCCESS,
        payload: posts,
      });
    } catch (ex) {
      dispatch({
        type: Action.PERSON_INSTAGRAM_POSTS_FETCH_FAILURE,
        payload: {
          errorCode: 601,
          message: `Fetching instagram posts failed`,
          error: ex,
        },
      });
    }
  };
};

const processProfiles = () => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.PERSON_PROFILES_PROCESS_REQUEST });

      const state = getState();
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const posts = await INTEL_SNEK.person.processProfiles({
        personName,
      });

      dispatch({
        type: Action.PERSON_PROFILES_PROCESS_SUCCESS,
        payload: posts,
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
      const personName = extractNameFromPersonSlug(state.user.person.slug);

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
      const personName = extractNameFromPersonSlug(state.user.person.slug);

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
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const res = await INTEL_SNEK.social.follow({
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
      const personName = extractNameFromPersonSlug(state.user.person.slug);

      const res = await INTEL_SNEK.social.unfollow({
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

//#endregion
//#region > Exports
export {
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
};
//#endregion
