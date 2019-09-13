import {
  SET_WINE_STYLE,
  SET_WINE_COUNTRIES,
  SET_SELECTED_WINE_COUNTRIES,
  SET_FILTERS,
  SET_COUNTRIES_LOADED,
  SET_FILTERS_LOADED
} from "../actions/actionsPicker";

// Temp Data
import stylesData from "../../data/wineStyles";
// import countries from "../../data/wineCountries";

const initialState = {
  countriesLoaded: false,
  filtersLoaded: false,
  wineStyles: stylesData,
  wineCountries: [],
  wineRegions: [],
  wineGrapes: [],
  wineProducers: [],
  selectedStyle: "",
  selectedCountries: [],
  pinnedRegions: {},
  pinnedGrapes: {},
  pinneProducers: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES_LOADED:
      return {
        ...state,
        countriesLoaded: action.payload
      };
    case SET_FILTERS_LOADED:
      return {
        ...state,
        filtersLoaded: action.payload
      };
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
    case SET_FILTERS: {
      return {
        ...state,
        wineRegions: [...action.payload.regions],
        wineGrapes: [...action.payload.grapes],
        wineProducers: [...action.payload.producers],
        filtersLoaded: true
      };
    }
    default:
      return state;
  }
}
