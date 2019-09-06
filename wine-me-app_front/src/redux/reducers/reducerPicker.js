import { LOADING_REGIONS, SET_WINE_STYLE } from "../actions/actionsPicker";

// Temp Data
import stylesData from "../../data/wineStyles";

const initialState = {
  loadingRegions: false,
  selectedStyle: "",
  wineStyles: stylesData
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_WINE_STYLE:
      return {
        ...state,
        selectedStyle: action.payload
      };
    case LOADING_REGIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
