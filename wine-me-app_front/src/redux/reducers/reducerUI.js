import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_DEVICE_FLAGS,
  SET_INIT_DATA,
  SET_WINE_STYLE_FOCUS
} from "../actions/actionsUI";

const initialState = {
  initDataLoaded: false,
  isTouchScreen: false,
  isSmartphone: false,
  focusedWineStyle: 0,
  maxBreakpoint: "md",
  defaultLang: "en",
  currentLang: "en",
  dict: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_FLAGS:
      return {
        ...state,
        ...action.payload
      };
    case SET_INIT_DATA:
      return {
        ...state,
        dict: action.payload,
        initDataLoaded: true
      };
    case SET_WINE_STYLE_FOCUS:
      return {
        ...state,
        focusedWineStyle: action.payload
      };
    case SET_ERRORS:
      return {
        ...state
      };
    case CLEAR_ERRORS:
      return {
        ...state
      };
    default:
      return state;
  }
}
