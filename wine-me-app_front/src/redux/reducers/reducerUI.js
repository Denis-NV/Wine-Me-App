import { SET_ERRORS, CLEAR_ERRORS } from "../actions/actionsUI";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
