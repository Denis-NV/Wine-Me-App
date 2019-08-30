import React from "react";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

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
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
