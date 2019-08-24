import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Sommelier from "./components/pages/Sommelier";

// Utils
import themeObj from "./util/theme";

// CSS
import "./App.css";

// IMPORTS END

const theme = createMuiTheme(themeObj);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <header className="AppHeader">
            <h1>Wine Mate Header</h1>
          </header>
          <Switch>
            <Route exact path="/" component={Sommelier} />
            <Route exact path="/sommelier" component={Sommelier} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
