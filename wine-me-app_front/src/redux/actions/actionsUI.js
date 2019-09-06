// import axios from "axios";
import dict from "../../data/dictionary";

export const SET_ERRORS = "SET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_DEVICE_FLAGS = "SET_DEVICE_FLAGS";
export const SET_INIT_DATA = "SET_INIT_DATA";
export const SET_WINE_STYLE_FOCUS = "SET_WINE_STYLE_FOCUS";

export const setTouchScreenFlag = (isTouchScreen, isSmartphone) => dispatch => {
  //
  dispatch({
    type: SET_DEVICE_FLAGS,
    payload: { isTouchScreen, isSmartphone }
  });
};

export const loadGlobalDictionary = lang => dispatch => {
  //
  // axios
  //   .get(`/dict/${lang}`)
  //   .then(res => {
  //     // console.log(res.data);
  //     dispatch({ type: SET_INIT_DATA, payload: res.data });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  dispatch({ type: SET_INIT_DATA, payload: dict });
};

export const setWineStyleFocus = index => dispatch => {
  //
  dispatch({ type: SET_WINE_STYLE_FOCUS, payload: index });
};
