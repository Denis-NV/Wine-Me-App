import {
  SET_WINE_STYLE,
  SET_WINE_COUNTRIES,
  SET_SELECTED_WINE_COUNTRIES,
  SET_FILTERS,
  SET_FILTERS_LOADED,
  SET_PINNED_FILTERS
} from "../actions/actionsPicker";

import { SET_INIT_DATA } from "../actions/actionsUI";

// Temp Data
// import stylesData from "../../data/wineStyles";
// import countries from "../../data/wineCountries";

const initialState = {
  filtersLoaded: false,
  wineStyles: [],
  wineCountries: [],
  wineFilters: [[], [], []],
  selectedStyle: -1,
  selectedCountries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INIT_DATA: {
      return {
        ...state,
        wineStyles: action.payload.styles
      };
    }
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
        wineFilters: [
          [
            ...action.payload.regions.map(item => ({
              ...item,
              pinned: false,
              filteredBy: []
            }))
          ],
          [
            ...action.payload.grapes.map(item => ({
              ...item,
              pinned: false,
              filteredBy: []
            }))
          ],
          [
            ...action.payload.producers.map(item => ({
              ...item,
              pinned: false,
              filteredBy: []
            }))
          ]
        ],
        filtersLoaded: true
      };
    }
    case SET_PINNED_FILTERS: {
      // const pinned = {filter: state.wineFilters[action.payload.type], id:action.payload.id};
      const pinnedId = action.payload.id;
      const newFilters = [...state.wineFilters];
      const pinnedFilter = newFilters[action.payload.type];
      const pinnedItem = pinnedFilter.filter(item => item.id === pinnedId)[0];
      let filtered_1 = {};
      let filtered_2 = {};

      switch (action.payload.type) {
        case 0: {
          filtered_1 = {
            filter: newFilters[1],
            ids: pinnedItem["grapesRefs"]
          };
          filtered_2 = {
            filter: newFilters[2],
            ids: pinnedItem["producersRefs"]
          };
          break;
        }
        case 1: {
          filtered_1 = {
            filter: newFilters[0],
            ids: pinnedItem["regionsRefs"]
          };
          filtered_2 = {
            filter: newFilters[2],
            ids: pinnedItem["producersRefs"]
          };
          break;
        }
        case 2: {
          filtered_1 = {
            filter: newFilters[0],
            ids: pinnedItem["regionsRefs"]
          };
          filtered_2 = {
            filter: newFilters[1],
            ids: pinnedItem["grapesRefs"]
          };
          break;
        }
        default:
          console.log("No filter type provided");
      }

      pinnedItem.pinned = !pinnedItem.pinned;

      const updateFiltered = filtered => {
        filtered.ids.forEach(id => {
          const filteredItem = filtered.filter.filter(
            item => item.id === id
          )[0];
          if (filteredItem) {
            pinnedItem.pinned
              ? filteredItem.filteredBy.push(pinnedId)
              : (filteredItem.filteredBy = filteredItem.filteredBy.filter(
                  item => item !== pinnedId
                ));
          }
        });
      };

      updateFiltered(filtered_1);
      updateFiltered(filtered_2);

      return {
        ...state,
        wineFilters: [...newFilters]
      };
    }
    default:
      return state;
  }
}
