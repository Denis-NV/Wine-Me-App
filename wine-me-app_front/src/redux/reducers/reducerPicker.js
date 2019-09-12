import {
  SET_WINE_STYLE,
  SET_WINE_COUNTRIES,
  SET_SELECTED_WINE_COUNTRIES
} from "../actions/actionsPicker";

// Temp Data
import stylesData from "../../data/wineStyles";
import countries from "../../data/wineCountries";

const initialState = {
  countriesLoaded: true,
  filtersLoaded: false,
  wineStyles: stylesData,
  wineCountries: [...countries],
  wineRegions: [],
  wineGrapes: [],
  wineProducers: [],
  selectedStyle: "redStyle1",
  selectedCountries: [],
  pinnedRegions: {},
  pinnedGrapes: {},
  pinneProducers: {}
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
