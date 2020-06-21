//#region > Imports
//> Additional
// SHA Hashing algorithm
import sha256 from "js-sha256";
//#endregion

//#region > Register
/**
 * Register user.
 *
 * @param registrationData Data to register a user
 * @description Handles the registration of users
 */
const register = (registrationData) => {
  return async (intel) => {
    try {
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

      return await session.tasks.user
        .registration(registrationData)
        .then((res) => {
          if (res.result === "FAIL") {
            return {
              errorCode: 6,
              message: "Registration failed",
              raw: undefined,
            };
          } else {
            return {
              registrationData,
              username: registrationData.username,
              password: clearPassword,
            };
          }
        });
    } catch (ex) {
      return {
        errorCode: 6,
        message: "Registration failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Caching
/**
 * Write cache.
 *
 * @param platformData A data object to store in cache
 * @description Handles the calls for writing to cache
 */
const writeCache = (platformData) => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return session.tasks.user.cache(platformData);
    } catch (ex) {
      return {
        errorCode: 7,
        message: "Writing to cache failed",
        raw: ex,
      };
    }
  };
};

/**
 * Read cache.
 *
 * @param username A username to read the cache from
 * @description Handles the calls for reading the cache
 */
const readCache = (username) => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return session.tasks.user
        .profile("/registration/" + username)
        .then(async ({ data }) => {
          if (!data.profile) {
            return {
              errorCode: 8,
              message: "Cache not loaded",
              raw: undefined,
            };
          } else {
            // Split profile to chunks
            const profile = data.profile;
            const sources = profile.sources
              ? JSON.parse(profile.sources)
              : null;

            let platformData = profile.platformData
              ? JSON.parse(profile.platformData)
              : {};

            let user = platformData.user ? platformData.user : {};

            // Check if data is valid
            if (!sources) {
              return {
                errorCode: 9,
                message: "Sources are empty",
                raw: undefined,
              };
            } else {
              // Set settings for first time fetching
              if (Object.keys(user).length === 0) {
                user.firstName = profile.firstName;
                user.lastName = profile.lastName;
                user.email = profile.email;
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
                username: profile.username,
                platformData: {
                  ...platformData,
                  user,
                },
                sources,
                verified: data.profile.verified,
                accessories: {
                  badges: data.profile.bids
                    ? JSON.parse(data.profile.bids)
                    : null,
                  themes: data.profile.tids
                    ? JSON.parse(data.profile.tids)
                    : null,
                },
              };

              return fetchedUser;
            }
          }
        });
    } catch (ex) {
      return {
        errorCode: 10,
        message: "Reading from cache failed",
        raw: ex,
      };
    }
  };
};

/**
 * Update cache.
 *
 * @param fetchedUser A fetched user object
 * @description Handles the calls for updating the cache
 */
const updateCache = (fetchedUser) => {
  return async (intel) => {
    try {
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

      session.tasks.user.cache(JSON.stringify(fetchedUser.platformData));

      return fetchedUser;
    } catch (ex) {
      return {
        errorCode: 7,
        message: "Updating cache failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Exports
//> Default Constant Variable
export { register, writeCache, readCache, updateCache };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
