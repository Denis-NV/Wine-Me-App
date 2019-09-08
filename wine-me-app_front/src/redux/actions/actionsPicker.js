// import axios from "axios";
import countries from "../../data/wineCountries";

export const SET_WINE_STYLE = "SET_WINE_STYLE";
export const SET_WINE_COUNTRIES = "SET_WINE_COUNTRIES";
export const SET_SELECTED_WINE_COUNTRIES = "SET_SELECTED_WINE_COUNTRIES";

export const setWineStyle = wineStyle => dispatch => {
  dispatch({ type: SET_WINE_STYLE, payload: wineStyle });

  dispatch(loadExistingCountries());
};

export const loadExistingCountries = () => dispatch => {
  // axios
  //   .get(`/countries`)
  //   .then(res => {
  //     dispatch({ type: SET_WINE_COUNTRIES, payload: res.data });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  dispatch({ type: SET_WINE_COUNTRIES, payload: countries });
};

export const setSelectedWineCountries = codeList => dispatch => {
  dispatch({ type: SET_SELECTED_WINE_COUNTRIES, payload: codeList });
};
