export const SET_ERRORS = "SET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_DEVICE_FLAGS = "SET_DEVICE_FLAGS";
export const SET_WINE_STYLE_FOCUS = "SET_WINE_STYLE_FOCUS";

export const setTouchScreenFlag = (isTouchScreen, isSmarphone) => dispatch => {
  //
  dispatch({ type: SET_DEVICE_FLAGS, payload: { isTouchScreen, isSmarphone } });
};

export const setWineStyleFocus = index => dispatch => {
  //
  dispatch({ type: SET_WINE_STYLE_FOCUS, payload: index });
};
