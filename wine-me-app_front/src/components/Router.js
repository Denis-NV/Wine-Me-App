import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// MUI
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Components
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import PickerView from "./pages/PickerView";
import WinesView from "./pages/WinesView";
import SearchView from "./pages/SearchView";
import ProfileView from "./pages/ProfileView";
import WineCardView from "./pages/WineCardView";

// IMPORTS END

function Router() {
  const isTouchScreen = useMediaQuery("(hover: none)");

  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <Fragment>
            <AppHeader isTouchScreen={isTouchScreen} />
            <TransitionGroup className="mainContent">
              <CSSTransition
                key={location.key}
                classNames="pages"
                timeout={250}
              >
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage pickerPage"
                        style={{ background: "#e57373" }}
                      >
                        <PickerView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/wines"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage winesPage"
                        style={{ background: "#f06292" }}
                      >
                        <WinesView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/wines/wine"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage wineCardPage"
                        style={{ background: "#dce775" }}
                      >
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/search"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage searchPage"
                        style={{ background: "#ce93d8" }}
                      >
                        <SearchView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/search/wine"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage wineCardPage"
                        style={{ background: "#dce775" }}
                      >
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/profile"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage profilePage"
                        style={{ background: "#90a4ae" }}
                      >
                        <ProfileView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/profile/wine"
                    render={({ ...rest }) => (
                      <div
                        className="topLevelPage wineCardPage"
                        style={{ background: "#dce775" }}
                      >
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <BottomNav isTouchScreen={isTouchScreen} />
          </Fragment>
        )}
      />
    </BrowserRouter>
  );
}

export default Router;
