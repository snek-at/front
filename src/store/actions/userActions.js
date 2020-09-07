//#region > Imports
//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//#endregion

//#region > User Actions
/**
 * Handle login.
 *
 * @param user A user to login with
 * @description Handles states for login
 */
const loginAction = (user) => {
  return async (dispatch, getState, { CLIENT_SNEK }) => {
    try {
      dispatch({ type: Action.USER_LOGIN_REQUEST });

      const whoami = await CLIENT_SNEK.session.begin(user);

      if (!whoami?.anonymous && whoami?.__typename === "SNEKUser") {
        dispatch({
          type: Action.USER_LOGIN_SUCCESS,
          payload: {
            username: whoami.username,
            anonymous: false,
          },
        });

        dispatch(getPerson(whoami.username));
      } else if (whoami.anonymous) {
        dispatch({
          type: Action.USER_LOGIN_SUCCESS,
          payload: {
            anonymous: true,
          },
        });
      } else {
        throw Error("Login failed");
      }
    } catch (ex) {
      dispatch({
        type: Action.USER_LOGIN_FAILURE,
        payload: {
          errorCode: 619,
          message: "Login failed",
          error: ex,
        },
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
  return async (dispatch, getState, { CLIENT_SNEK }) => {
    try {
      dispatch({ type: Action.USER_LOGOUT_REQUEST });

      await CLIENT_SNEK.session.end();

      dispatch({ type: Action.USER_LOGOUT_SUCCESS });
    } catch (ex) {
      dispatch({
        type: Action.USER_LOGOUT_FAILURE,
        payload: {
          errorCode: 601,
          message: "Logout failed",
          error: ex,
        },
      });
    }
  };
};

/**
 * Get person page for a logged user
 */
const getPerson = (personName) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.USER_PERSON_FETCH_REQUEST });

      const person = await INTEL_SNEK.person.get({ personName });

      dispatch({ type: Action.USER_PERSON_FETCH_SUCCESS, payload: person });
    } catch (ex) {
      dispatch({
        type: Action.USER_PERSON_FETCH_FAILURE,
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
 * Register new person/user
 */
const register = (
  username,
  firstName,
  lastName,
  email,
  password,
  redemptionCode
) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.USER_PERSON_SIGNUP_REQUEST });

      const registration = await INTEL_SNEK.person.register({
        formValues: {
          username,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          redemption_code: redemptionCode,
        },
      });

      if (registration.result === "ok") {
        dispatch({ type: Action.USER_PERSON_SIGNUP_SUCCESS });

        dispatch(loginAction({ username, password }));
      } else {
        dispatch({
          type: Action.USER_PERSON_SIGNUP_FAILURE,
          payload: {
            errorCode: 601,
            message: `Registration failed`,
          },
        });
      }
    } catch (ex) {
      dispatch({
        type: Action.USER_PERSON_SIGNUP_FAILURE,
        payload: {
          errorCode: 601,
          message: `Registration error`,
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Exports
export { loginAction, logoutAction, getPerson };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
