//#region > Registration
/**
 * Append Source Objects
 *
 * @param sourceList A source object
 * @description Hands source list over to intel
 */
const appendSourceObjects = (sourceList) => {
  return async (intel) => {
    try {
      return intel.appendList(sourceList);
    } catch (ex) {
      return {
        errorCode: 2,
        message: "Appending source objects failed",
        raw: ex,
      };
    }
  };
};

/**
 * Fetch GitLab Servers
 *
 * @description Retrieves a list of available GitLab servers
 */
const fetchGitLabServers = () => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return session.tasks.general.gitlabServer().then(({ data }) => {
        const gitLabServers = data?.page?.supportedGitlabs;

        if (gitLabServers) {
          return gitLabServers;
        } else {
          return false;
        }
      });
    } catch (ex) {
      return {
        errorCode: 5,
        message: "Fetching GitLab server failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Data Handling
/**
 * Get intel data
 *
 * @description Retrieves data from current applied source list
 */
const getData = () => {
  return async (intel) => {
    try {
      return intel.get();
    } catch (ex) {
      return {
        errorCode: 3,
        message: "Getting intel data failed",
        raw: ex,
      };
    }
  };
};

/**
 * Save settings
 *
 * @param nextSettings The settings that should be applied
 * @description Saves the user settings
 */
const saveSettings = (nextSettings) => {
  return async (intel, { currentCache }) => {
    try {
      const session = intel.snekclient.session;

      // Check for mandatory fields
      if (nextSettings.email) {
        currentCache.user.firstName = nextSettings.first_name
          ? nextSettings.first_name
          : "";
        currentCache.user.lastName = nextSettings.last_name
          ? nextSettings.last_name
          : "";
        currentCache.user.email = nextSettings.email
          ? nextSettings.email
          : currentCache.user.email;
        currentCache.profile.websiteUrl = nextSettings.website
          ? nextSettings.website
          : "";
        currentCache.profile.location = nextSettings.location
          ? nextSettings.location
          : "";
        currentCache.profile.company = nextSettings.company
          ? nextSettings.company
          : "";
        currentCache.user.settings = {
          showTopLanguages: nextSettings.showTopLanguages,
          showLocalRanking: nextSettings.showLocalRanking,
          show3DDiagram: nextSettings.show3DDiagram,
          show2DDiagram: nextSettings.show2DDiagram,
          showEmailPublic: nextSettings.showEmailPublic,
          showCompanyPublic: nextSettings.showCompanyPublic,
          activeTheme: nextSettings.activeTheme,
        };
      }

      session.tasks.user.cache(JSON.stringify(currentCache));

      return currentCache;
    } catch (ex) {
      return {
        errorCode: 4,
        message: "Saving settings failed",
        raw: ex,
      };
    }
  };
};

/**
 * Get all users
 *
 * @description Retrieves a list of all users
 */
const getAllPageUrls = () => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return await session.tasks.general.allPageUrls().then((res) => {
        let urls = [];

        res.data.pages &&
          res.data.pages.forEach((page) => {
            if (page.urlPath.includes("registration/")) {
              let url = page.urlPath.split("/")[2];

              urls.push(url);
            }
          });

        return urls;
      });
    } catch (ex) {
      return {
        errorCode: 5,
        message: "Getting all page urls failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Exports
export {
  appendSourceObjects,
  getData,
  saveSettings,
  getAllPageUrls,
  fetchGitLabServers,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
