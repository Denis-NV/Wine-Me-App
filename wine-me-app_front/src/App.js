import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Components
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import PickerView from "./components/pages/PickerView";
import WinesView from "./components/pages/WinesView";
import SearchView from "./components/pages/SearchView";
import ProfileView from "./components/pages/ProfileView";
import WineCardView from "./components/pages/WineCardView";

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

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <AppHeader isTouchScreen={isTouchScreen} />
          <Switch>
            <Route exact path="/" component={PickerView} />
            <Route exact path="/wines" component={WinesView} />
            <Route exact path="/wines/wine" component={WineCardView} />
            <Route exact path="/search" component={SearchView} />
            <Route exact path="/search/wine" component={WineCardView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/profile/wine" component={WineCardView} />
          </Switch>

          <BottomNav isTouchScreen={isTouchScreen} />
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
