import { LOADING_REGIONS } from "../actions/actionsPicker";

const initialState = {
  loadingRegions: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_REGIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
