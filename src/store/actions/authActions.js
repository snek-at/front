//#region > Authentication Actions
/**
 * Handle login.
 *
 * @param user A user to login with
 * @description Handles states for login
 */
const loginAction = (user) => {
  return (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      return session
        .begin(user)
        .then((whoami) => {
          if (!whoami?.anonymous && whoami?.__typename === "SNEKUser") {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                username: whoami.username,
                avatarUrl:
                  "https://www.clipartmax.com/png/full/166-1669056_the-20-cooler-octocat-github-octocat.png",
              },
            });
          } else if (whoami.anonymous) {
            dispatch({
              type: "LOGIN_ANON_SUCCESS",
              payload: {},
            });
          } else {
            throw Error("Login failed")
          }
        })
        .catch((ex) =>
          dispatch({
            type: "LOGIN_FAILED",
            payload: {
              errorCode: 619,
              message: "Incorrect username or password",
              error: ex,
            },
          })
        );
    } catch (ex) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorCode: 600, message: "Login failed", error: ex },
      });
    }
  };
};

/**
 * Logout user.
 *
 * @description Handles the logging out of active users
 */
const logoutAction = () => {
  return async (dispatch, getState, { getIntel }) => {
    try {
      const intel = getIntel();
      const session = intel.snekclient.session;

      await session
        .end()
        .then(() => {
          dispatch({
            type: "LOGOUT_SUCCESS",
            payload: {},
          });

          dispatch({
            type: "REMOVE_LOGGED_USER",
          });
        })
        .catch((ex) =>
          dispatch({ type: "LOGOUT_ERROR", payload: { error: ex } })
        );
    } catch (ex) {
      dispatch({
        type: "LOGOUT_FAILED",
        payload: {
          errorCode: 601,
          message: "Logout failed",
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Exports
//> Default Component
export { loginAction, logoutAction };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
