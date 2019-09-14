import axios from "axios";
// import countries from "../../data/wineCountries";

export const SET_COUNTRIES_LOADED = "SET_COUNTRIES_LOADED";
export const SET_FILTERS_LOADED = "SET_FILTERS_LOADED";
//
export const SET_WINE_STYLE = "SET_WINE_STYLE";
export const SET_WINE_COUNTRIES = "SET_WINE_COUNTRIES";
export const SET_SELECTED_WINE_COUNTRIES = "SET_SELECTED_WINE_COUNTRIES";
export const SET_FILTERS = "SET_FILTERS";
export const SET_PINNED_FILTERS = "SET_PINNED_FILTERS";

export const setWineStyle = (wineStyle = "") => dispatch => {
  dispatch({ type: SET_WINE_STYLE, payload: wineStyle });
};

export const getExistingCountries = () => dispatch => {
  dispatch({ type: SET_COUNTRIES_LOADED, payload: false });

  axios
    .get(`/countries`)
    .then(res => {
      dispatch({ type: SET_WINE_COUNTRIES, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
  //
  // dispatch({ type: SET_WINE_COUNTRIES, payload: countries });
};

export const setSelectedWineCountries = (codeList = []) => dispatch => {
  dispatch({ type: SET_SELECTED_WINE_COUNTRIES, payload: codeList });
};

export const getWineFilters = (
  selectedStyle,
  currentLang,
  selectedCountries = []
) => dispatch => {
  dispatch({ type: SET_FILTERS_LOADED, payload: false });

  axios
    .post("/filters", { selectedStyle, selectedCountries, currentLang })
    .then(res => {
      dispatch({ type: SET_FILTERS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const setPinnedWineFilters = (type, id) => dispatch => {
  dispatch({ type: SET_PINNED_FILTERS, payload: { type, id } });
};

export const resetWineFilters = () => dispatch => {
  dispatch({
    type: SET_FILTERS,
    payload: { regions: [], grapes: [], producers: [] }
  });
};
