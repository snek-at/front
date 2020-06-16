//#region > Authentication
/**
 * Handle login
 *
 * @param user A user to login with
 * @description Handles states for login
 */
const login = (user) => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      return await session.begin(user).then((whoami) => {
        if (whoami?.username !== process.env.REACT_APP_ANONYMOUS_USER) {
          return {
            username: whoami.username,
            avatarUrl:
              "https://www.clipartmax.com/png/full/166-1669056_the-20-cooler-octocat-github-octocat.png",
          };
        } else {
          return false;
        }
      });
    } catch (ex) {
      return {
        errorCode: 0,
        message: "Login failed",
        raw: ex,
      };
    }
  };
};

/**
 * Logout user.
 *
 * @description Handles the logging out of active users
 */
const logout = () => {
  return async (intel) => {
    try {
      const session = intel.snekclient.session;

      await session.end();

      return true;
    } catch (ex) {
      return {
        errorCode: 1,
        message: "Logout failed",
        raw: ex,
      };
    }
  };
};
//#endregion

//#region > Exports
export { login, logout };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
