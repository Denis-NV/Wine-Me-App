export const LOADING_REGIONS = "LOADING_REGIONS";
export const SET_WINE_STYLE = "SET_WINE_STYLE";

export const setWineStyle = wineStyle => dispatch => {
  dispatch({ type: SET_WINE_STYLE, payload: wineStyle });
};
