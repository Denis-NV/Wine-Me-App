import React from "react";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_DEVICE_FLAGS } from "./redux/actions/actionsUI";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Components
import Router from "./components/Router";

// Utils
import themeObj from "./util/theme";

// CSS
import "./css/Reset.css";
// import "./css/Reset.mild.css";
import "./css/Typography.css";
import "./css/App.css";

// IMPORTS END

const theme = createMuiTheme(themeObj);

function App() {
  const isTouchScreen = useMediaQuery("(hover: none)");
  const isNarrow = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isSmartphone = isTouchScreen && isNarrow;

  store.dispatch({
    type: SET_DEVICE_FLAGS,
    payload: { isTouchScreen, isSmartphone }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
