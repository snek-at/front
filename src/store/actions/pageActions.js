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
      type: "LOGIN_SUCCESS",
      payload: {
        data: result,
      },
    });
  };
};
