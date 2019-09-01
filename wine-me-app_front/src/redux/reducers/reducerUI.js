import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_DEVICE_FLAGS,
  SET_WINE_STYLE_FOCUS
} from "../actions/actionsUI";

const initialState = {
  loading: false,
  isTouchScreen: false,
  isSmartphone: false,
  focusedWineStyle: 0,
  maxBreakpoint: "md"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_FLAGS:
      return {
        ...state,
        ...action.payload
      };
    case SET_WINE_STYLE_FOCUS:
      return {
        ...state,
        focusedWineStyle: action.payload
      };
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
