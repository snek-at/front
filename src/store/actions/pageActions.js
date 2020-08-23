//#region > Enterprise Page Actions
/**
 * Deliver page data by handle
 *
 * @param handle Page handle string
 * @description Delivers page data
 */
const getPageByHandle = (handle) => {
  return (dispatch, getState, { getIntel }) => {
    const enterprise = require("../../components/pages/CompanyPage/dummy/data");
    const users = require("../../components/pages/CompanyPage/dummy/users");
    const projects = require("../../components/pages/CompanyPage/dummy/projects");

    dispatch({
      type: "GETPAGE_SUCCESS",
      payload: {
        data: {
          enterprise: enterprise ? enterprise.default.payload.data : null,
          users: users ? users.default.payload.data : null,
          projects: projects ? projects.default.payload.data : null,
        },
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
