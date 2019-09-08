import {
  SET_WINE_STYLE,
  SET_WINE_COUNTRIES,
  SET_SELECTED_WINE_COUNTRIES
} from "../actions/actionsPicker";

// Temp Data
import stylesData from "../../data/wineStyles";

const initialState = {
  countriesLoaded: false,
  loadingRegions: false,
  wineStyles: stylesData,
  selectedStyle: "",
  wineCountries: [],
  selectedCountries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_WINE_STYLE:
      return {
        ...state,
        selectedStyle: action.payload
      };
    case SET_WINE_COUNTRIES: {
      return {
        ...state,
        countriesLoaded: true,
        wineCountries: [...action.payload]
      };
    }
    case SET_SELECTED_WINE_COUNTRIES: {
      return {
        ...state,
        selectedCountries: [...action.payload]
      };
    }
    default:
      return state;
  }
}
