//#region > Imports
//> Additional
// SHA hashing algorithm
import { sha256 } from "js-sha256";

//> Action Types
import * as Action from "../types";
//> Intel
import INTEL_SNEK from "snek-intel/lib/utils/snek";
//> Actions
// Functions to send data from the application to the store
import { getProfiles } from "./personActions";
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

      if (user?.password) {
        user.password = sha256(user.password);
      }

      const whoami = await CLIENT_SNEK.session.begin(user);

      if (!whoami?.anonymous && whoami?.__typename === "SNEKUser") {
        await dispatch({
          type: Action.USER_LOGIN_SUCCESS,
          payload: {
            username: whoami.username,
            anonymous: false,
          },
        });

        await dispatch(getPerson(whoami.username));
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

      person.profiles = await dispatch(getProfiles(personName));

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
          password: sha256(password),
          redemption_code: redemptionCode,
        },
      });
      console.log(registration);

      if (registration.result === "OK") {
        dispatch({ type: Action.USER_PERSON_SIGNUP_SUCCESS });
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

/**
 * Check if there is already a registered user with the provided username
 */
const isValidUsername = (username) => {
  return async (dispatch, getState, {}) => {
    try {
      dispatch({ type: Action.USER_EXISTS_CHECK_REQUEST });

      const exists = await INTEL_SNEK.general.checkUserExists({ username });

      dispatch({ type: Action.USER_EXISTS_CHECK_SUCCESS });

      return !exists;
    } catch (ex) {
      dispatch({
        type: Action.USER_EXISTS_CHECK_FAILURE,
        payload: {
          errorCode: 601,
          message: `Cannot check if there is already a user with '${username}' as name`,
          error: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Exports
export { loginAction, logoutAction, getPerson, register, isValidUsername };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
