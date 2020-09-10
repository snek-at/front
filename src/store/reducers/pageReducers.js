//#region > Constant Variables
const INIT_STATE = {
  page: null,
  error: null,
};
//#endregion

//#region > Reducers
const pageReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //> LOGIN
    case "GETPAGE_SUCCESS":
      return {
        ...state,
        page: action.payload,
        authErrorDetails: null,
      };
    default:
      return state;
  }
};
//#endregion

//#region > Exports
//> Default Component
export default pageReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
