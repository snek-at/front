//#region > Imports
//> Intel
import { Intel } from "snek-intel";
//#endregion

//#region > Constant Variables
const INTEL = new Intel();
//#endregion

//#region > Core
/**
 * The intel ferry.
 *
 * @param actionFn The action to use
 * @param args Arguments to use for the action
 * @description The intel ferry is used to deliver calls to the SNEK-Intel
 */
const ferry = async (actionFn, args) => {
  return actionFn(INTEL, args).then((res) => {
    console.log(res);
    switch (res.errorCode) {
      case undefined:
        console.log("SUCCESS", res);
        return res;
      default:
        console.log("ERROR");
        console.error(res.message);
        return null;
    }
  });
};
//#endregion

//#region > Exports
export { ferry };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
