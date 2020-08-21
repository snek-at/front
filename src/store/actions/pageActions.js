//#region > Enterprise Page Actions
/**
 * Deliver page data by handle
 *
 * @param handle Page handle string
 * @description Delivers page data
 */
const getPageByHandle = (handle) => {
  return (dispatch, getState, { getIntel }) => {
    const result = {
      test: "asdf",
    };

    dispatch({
      type: "GETPAGE_SUCCESS",
      payload: {
        data: result,
      },
    });
  };
};

//#region > Exports
//> Default Component
export { getPageByHandle };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
