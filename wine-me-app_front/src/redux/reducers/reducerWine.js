import { POST_WINE } from "../actions/actionsWine";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_WINE:
      return {
        ...state
      };
    default:
      return state;
  }
}
