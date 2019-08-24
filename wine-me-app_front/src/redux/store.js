import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Reducers
import reducerUI from "./reducers/reducerUI";
import reducerUser from "./reducers/reducerUser";
import reducerPicker from "./reducers/reducerPicker";
import reducerWine from "./reducers/reducerWine";

//
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  UI: reducerUI,
  user: reducerUser,
  picker: reducerPicker,
  wine: reducerWine
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
