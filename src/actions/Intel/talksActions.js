//#region > Talks
/**
 * Get all talks.
 *
 * @description Handles the call for getting all talks.
 */
const getAllTalks = () => {
  return async (intel) => {
    try {
      return intel.getTalks();
    } catch (ex) {
      return {
        errorCode: 611,
        message: "Getting intel talks failed",
        raw: ex,
      };
    }
  };
};

/**
 * Get a talk.
 *
 * @param uid A unique id to find a talk
 * @param username A username associated with the talk
 * @description Handles the call for getting one specific talk
 */
const getTalk = (uid, username) => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return session.tasks.user
        .profile("/registration/" + username)
        .then(async ({ data }) => {
          if (data.profile) {
            let talks = JSON.parse(data.profile.platformData).talks;

            talks = talks.filter((talk) => {
              return talk.uid === uid;
            });

            return talks[0];
          } else {
            return {
              errorCode: 613,
              message: "Cannot get specific talk " + uid,
              raw: undefined,
            };
          }
        });
    } catch (ex) {
      return {
        errorCode: 614,
        message: "Getting talks failed",
        raw: ex,
      };
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
const uploadTalk = (file, talkInfo) => {
  return async (intel, { currentCache }) => {
    try {
      const session = intel.snekclient.session;

      return intel.appendTalk(file).then(() => {
        return intel.getTalks().then((talks) => {
          talks[talks.length - 1].repository = talkInfo;

          currentCache.talks.push(talks[talks.length - 1]);

          session.tasks.user.cache(JSON.stringify(currentCache));

          return currentCache;
        });
      });
    } catch (ex) {
      return {
        errorCode: 612,
        message: "Uploading talk failed",
        raw: ex,
      };
    }
  };
};

/**
 * Delete talk.
 *
 * @param talk A talk that should be deleted
 * @description Handles the call for deleting a talk.
 */
const deleteTalk = (talk) => {
  return async (intel, { currentCache }) => {
    try {
      const session = intel.snekclient.session;
      for (const index in currentCache.talks) {
        if (talk.uid === currentCache.talks[index].uid) {
          currentCache.talks.splice(index, 1);
        }
      }

      session.tasks.user.cache(JSON.stringify(currentCache));

      return currentCache;
    } catch (ex) {
      return {
        errorCode: 615,
        message: "Uploading talk failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Exports
//> Export > Constant Variables
export { getAllTalks, getTalk, uploadTalk, deleteTalk };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
