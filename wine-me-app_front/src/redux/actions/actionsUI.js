import axios from "axios";
// import dict from "../../data/dictionary";

export const SET_ERRORS = "SET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_DEVICE_FLAGS = "SET_DEVICE_FLAGS";
export const SET_INIT_DATA = "SET_INIT_DATA";
export const SET_WINE_STYLE_FOCUS = "SET_WINE_STYLE_FOCUS";
export const TOGGLE_GLOBAL_LOADING = "TOGGLE_GLOBAL_LOADING";

export const setTouchScreenFlag = (isTouchScreen, isSmartphone) => dispatch => {
  //
  dispatch({
    type: SET_DEVICE_FLAGS,
    payload: { isTouchScreen, isSmartphone }
  });
};

export const loadInitAssets = (lang = "en") => dispatch => {
  const initAssets = {};
  //
  // axios
  //   .get(`/dict/${lang}`)
  //   .then(res => {
  //     initAssets.dict = res.data;

  //     return axios.get("/styles");
  //   })
  //   .then(res => {
  //     initAssets.styles = res.data;
  //     console.log(initAssets);
  //     dispatch({ type: SET_INIT_DATA, payload: initAssets });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  axios
    .get("/styles")
    .then(res => {
      initAssets.styles = res.data;
      return axios.get(`/dict/${lang}`);
    })
    .then(res => {
      initAssets.dict = res.data;
      // console.log(initAssets);
      dispatch({ type: SET_INIT_DATA, payload: initAssets });
    })
    .catch(err => {
      console.log(err);
    });

  // dispatch({ type: SET_INIT_DATA, payload: dict });
};

export const setWineStyleFocus = index => dispatch => {
  //
  dispatch({ type: SET_WINE_STYLE_FOCUS, payload: index });
};

export const toggleGlogalLoadingProgress = isLoading => dispatch => {
  dispatch({ type: TOGGLE_GLOBAL_LOADING, payload: isLoading });
};
