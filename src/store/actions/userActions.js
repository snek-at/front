//#region > Imports
//> Redux
// Allows to manually display a LoadingBar
import { showLoading, hideLoading } from "react-redux-loading-bar";
//> Additional
// SHA Hashing algorithm
import sha256 from "js-sha256";
//#endregion

//#region > Register Actions
/**
 * Register user.
 *
 * @param registrationData Data to register a user
 * @description Handles the registration of users
 */
const registerAction = (registrationData) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;
      const clearPassword = registrationData.password;

      // Hash password
      registrationData.password = sha256(registrationData.password);

      // Append Source objects
      await intel.appendList(registrationData.sources);
      // Generate talks based on the previous appended list
      await intel.generateTalks(registrationData.sources);

      // Get fresh platform data
      const intelData = {
        ...(await intel.get()),
        talks: await intel.getTalks(),
      };

      // Save Object to platformData as JSON
      registrationData.platform_data = JSON.stringify(intelData);
      // Create JSON string out of sources for backend use
      registrationData.sources = JSON.stringify(registrationData.sources);

      return session.tasks.user
        .registration(registrationData)
        .then((res) => {
          if (res.result === "FAIL") {
            dispatch({
              type: "SIGNUP_FAILED",
              payload: {
                errorCode: 606,
                message: "Registration failed due to false registration result",
                error: undefined,
              },
            });
          } else {
            dispatch({
              type: "SIGNUP_SUCCESS",
              payload: {
                registrationData,
                username: registrationData.username,
                password: clearPassword,
              },
            });
          }
        })
        .catch((ex) =>
          dispatch({ type: "SIGNUP_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "SIGNUP_ERROR",
        payload: {
          errorCode: 617,
          message: "Registration failed",
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Caching Actions
/**
 * Write cache.
 *
 * @param platformData A data object to store in cache
 * @description Handles the calls for writing to cache
 */
const writeCacheAction = (platformData) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return session.tasks.user
        .cache(JSON.stringify(platformData))
        .then(() =>
          dispatch({
            type: "WRITE_CACHE_SUCCESS",
            payload: {},
          })
        )
        .catch((ex) =>
          dispatch({ type: "WRITE_CACHE_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "WRITE_CACHE_ERROR",
        payload: {
          errorCode: 607,
          message: "Writing to cache failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Read cache.
 *
 * @param username A username to read the cache from
 * @description Handles the calls for reading the cache
 */
const readCacheAction = (username) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return session.tasks.user
        .profile(username)
        .then(async ({ data }) => {
          if (!data.page) {
            dispatch({
              type: "READ_CACHE_FAILED",
              payload: {
                errorCode: 608,
                message: "Cache not loaded",
                error: undefined,
              },
            });
          } else {
            // Split profile to chunks
            const profile = data.page;
            const sources = profile.sources
              ? JSON.parse(profile.sources)
              : null;

            let platformData = profile.person.cache
              ? JSON.parse(profile.person.cache)
              : {};

            let user = platformData.user ? platformData.user : {};

            // Check if data is valid
            if (!sources) {
              dispatch({
                type: "READ_CACHE_FAILED",
                payload: {
                  errorCode: 609,
                  message: "Sources are empty",
                  error: undefined,
                },
              });
            } else {
              // Set settings for first time fetching
              if (
                ![
                  "firstName",
                  "lastName",
                  "email",
                  "avatarUrl",
                  "websiteUrl",
                  "websiteUrl",
                  "location",
                  "company",
                ].every((item) => user.hasOwnProperty(item))
              ) {
                user.firstName = platformData.profile.firstName;
                user.lastName = platformData.profile.lastName;
                user.email = platformData.profile.email;
                user.avatarUrl = platformData.profile.avatarUrl;
                user.websiteUrl = platformData.profile.websiteUrl;
                user.location = platformData.profile.location;
                user.company = platformData.profile.company;
              }

              if (!user.settings) {
                user.settings = {
                  show3DDiagram: true,
                  show2DDiagram: true,
                  showCompanyPublic: true,
                  showEmailPublic: true,
                  showLocalRanking: true,
                  activeTheme: null,
                };
              }

              // Build fetchedUser object
              let fetchedUser = {
                username: profile.personName,
                platformData: {
                  ...platformData,
                  user,
                },
                sources,
                verified: data.page.verified ? data.page.verified : true,
                accessories: {
                  badges: {
                    bids: [data.page.bids]
                  },
                  themes: {
                    tids: [data.page.tids]
                  }
                },
              };

              dispatch({
                type: "READ_CACHE_SUCCESS",
                payload: { fetchedUser },
              });

              const state = getState();

              if (fetchedUser.username === state.auth.loggedUser?.username) {
                dispatch({
                  type: "SET_LOGGED_USER",
                  payload: { fetchedUser },
                });
              }
            }
          }
        })
        .catch((ex) => {
          dispatch({ type: "READ_CACHE_ERROR", payload: { error: ex } })
        });
    } catch (ex) {
      dispatch({
        type: "READ_CACHE_ERROR",
        payload: {
          errorCode: 610,
          message: "Reading from cache failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Update cache.
 *
 * @param fetchedUser A fetched user object
 * @description Handles the calls for updating the cache
 */
const updateCacheAction = (fetchedUser) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      dispatch(showLoading());

      const intel = getIntel();
      const session = intel.snekclient.session;

      // Appned Source objects
      await intel.appendList(fetchedUser.sources);
      // Generate talks based on the previous appended list
      await intel.generateTalks(fetchedUser.sources);

      // Get fresh platform data
      const intelData = {
        ...(await intel.get()),
        talks: await intel.getTalks(),
      };

      // Fix duplicates
      for (const i in intelData.talks) {
        let state = true;

        for (const i2 in fetchedUser.platformData.talks) {
          if (
            intelData.talks[i].url === fetchedUser.platformData.talks[i2].url
          ) {
            state = false;
          }
        }

        if (state) {
          fetchedUser.platformData.talks.push(intelData.talks[i]);
        }
      }

      fetchedUser.platformData = {
        ...intelData,
        user: fetchedUser.platformData.user,
        talks: fetchedUser.platformData.talks,
      };

      intel.resetReducer();

      dispatch(hideLoading());

      return session.tasks.user
        .cache(JSON.stringify(fetchedUser.platformData))
        .then(
          dispatch({
            type: "UPDATE_CACHE_SUCCESS",
            payload: { fetchedUser },
          })
        )
        .catch((ex) =>
          dispatch({ type: "UPDATE_CACHE_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "UPDATE_CACHE_ERROR",
        payload: {
          errorCode: 618,
          message: "Updating cache failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Save settings
 *
 * @param nextSettings The settings that should be applied
 * @description Saves the user settings
 */
const saveSettingsActions = (nextSettings) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const state = getState();

      const fetchedUser = state.user.fetchedUser;
      const session = intel.snekclient.session;

      if (fetchedUser.platformData) {
        // Check for mandatory fields
        if (nextSettings.email) {
          fetchedUser.platformData.user.avatarUrl = nextSettings.avatar_url
            ? nextSettings.avatar_url
            : "";
          fetchedUser.platformData.user.firstName = nextSettings.first_name
            ? nextSettings.first_name
            : "";
          fetchedUser.platformData.user.lastName = nextSettings.last_name
            ? nextSettings.last_name
            : "";
          fetchedUser.platformData.user.email = nextSettings.email
            ? nextSettings.email
            : fetchedUser.platformData.user.email;
          fetchedUser.platformData.user.websiteUrl = nextSettings.website
            ? nextSettings.website
            : "";
          fetchedUser.platformData.user.location = nextSettings.location
            ? nextSettings.location
            : "";
          fetchedUser.platformData.user.company = nextSettings.company
            ? nextSettings.company
            : "";
          fetchedUser.platformData.user.settings = {
            showTopLanguages: nextSettings.showTopLanguages,
            showLocalRanking: nextSettings.showLocalRanking,
            show3DDiagram: nextSettings.show3DDiagram,
            show2DDiagram: nextSettings.show2DDiagram,
            showEmailPublic: nextSettings.showEmailPublic,
            showCompanyPublic: nextSettings.showCompanyPublic,
            activeTheme: nextSettings.activeTheme,
          };
        }

        session.tasks.user.cache(fetchedUser.username, JSON.stringify(fetchedUser.platformData));

        dispatch({
          type: "SAVE_SETTING_SUCCESS",
          payload: {
            fetchedUser,
          },
        });
      }
    } catch (ex) {
      dispatch({
        type: "SAVE_SETTING_ERROR",
        payload: {
          errorCode: 604,
          message: "Saving settings failed",
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Talks Actions
//> Is currently not needed but has been left for later implementations!
// /**
//  * Get all talks.
//  *
//  * @description Handles the call for getting all talks.
//  */
// const getAllTalksAction = () => {
//   return async (dispatch, getState, { getIntel }) => {
//     try {
//       const intel = getIntel();

//       return intel
//         .getTalks()
//         .then((talks) =>
//           dispatch({ type: "GET_TALKS_SUCCESS", payload: { talks } })
//         )
//         .catch((ex) =>
//           dispatch({ type: "GET_TALKS_ERROR", payload: { error: ex } })
//         );
//     } catch (ex) {
//       dispatch({
//         type: "GET_TALKS_ERROR",
//         payload: {
//           errorCode: 611,
//           message: "Getting intel talks failed",
//           error: ex,
//         },
//       });
//     }
//   };
// };

/**
 * Get a talk.
 *
 * @param uid A unique id to find a talk
 * @param username A username associated with the talk
 * @description Handles the call for getting one specific talk
 */
const getTalkAction = (uid, username) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return session.tasks.user
        .profile(username)
        .then(async ({ data }) => {
          if (data.page) {
            let talks = JSON.parse(data.page.platformData).talks;

            talks = talks.filter((talk) => {
              return talk.uid === uid;
            });

            dispatch({
              type: "GET_TALK_SUCCESS",
              payload: { talk: talks[0] },
            });
          } else {
            dispatch({
              type: "GET_TALK_FAILED",
              payload: {
                errorCode: 613,
                message: "Cannot get specific talk " + uid,
                error: undefined,
              },
            });
          }
        })
        .catch((ex) =>
          dispatch({ type: "GET_TALK_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "GET_TALK_ERROR",
        payload: {
          errorCode: 614,
          message: "Getting talks failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Upload talk.
 *
 * @param file A file to be uploaded
 * @param talkInfo Additional information to add to the talk
 * @description Handles the call for uploading a talk
 */
const uploadTalkAction = (file, talkInfo) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const state = getState();

      const fetchedUser = state.user.fetchedUser;
      const session = intel.snekclient.session;

      return intel.appendTalk(file).then(() => {
        return intel.getTalks().then((talks) => {
          talks[talks.length - 1].repository = talkInfo;

          fetchedUser.platformData.talks.push(talks[talks.length - 1]);

          session.tasks.user
            .cache(JSON.stringify(fetchedUser.platformData))
            .then(() =>
              dispatch({
                type: "UPLOAD_TALK_SUCCESS",
                payload: {
                  fetchedUser,
                },
              })
            );
        });
      });
    } catch (ex) {
      dispatch({
        type: "UPLOAD_TALK_ERROR",
        payload: {
          errorCode: 612,
          message: "Uploading talk failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * @todo currentCache over getState
 * Delete talk.
 *
 * @param talk A talk that should be deleted
 * @description Handles the call for deleting a talk.
 */
const deleteTalkAction = (talk) => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const state = getState();

      const fetchedUser = state.user.fetchedUser;
      const session = intel.snekclient.session;

      for (const index in fetchedUser.platformData.talks) {
        if (talk.uid === fetchedUser.platformData.talks[index].uid) {
          fetchedUser.platformData.talks.splice(index, 1);
        }
      }

      session.tasks.user.cache(JSON.stringify(fetchedUser.platformData));

      dispatch({
        type: "DELETING_TALK_SUCCESS",
        payload: {
          fetchedUser,
        },
      });
    } catch (ex) {
      dispatch({
        type: "DELETING_TALK_ERROR",
        payload: {
          errorCode: 615,
          message: "Deleting talk failed",
          raw: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Exports
//> Default Component
export {
  registerAction,
  writeCacheAction,
  readCacheAction,
  updateCacheAction,
  saveSettingsActions,
  //getAllTalksAction,
  getTalkAction,
  uploadTalkAction,
  deleteTalkAction,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
