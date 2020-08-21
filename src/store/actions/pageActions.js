//#region > Enterprise Page Actions
/**
 * Deliver page data by handle
 *
 * @param handle Page handle string
 * @description Delivers page data
 */
const getPageByHandle = (handle) => {
  return (dispatch, getState, { getIntel }) => {
    const result = require("../../components/pages/CompanyPage/dummy/data");

    dispatch({
      type: "GETPAGE_SUCCESS",
      payload: {
        data: result ? result.default.payload.data : null,
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
