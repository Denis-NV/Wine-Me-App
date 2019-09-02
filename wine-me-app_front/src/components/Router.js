import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <Fragment>
            <AppHeader />
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
                      <div className="topLevelPage pickerPage">
                        <PickerView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/wines"
                    render={({ ...rest }) => (
                      <div className="topLevelPage winesPage">
                        <WinesView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/wines/wine"
                    render={({ ...rest }) => (
                      <div className="topLevelPage wineCardPage">
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/search"
                    render={({ ...rest }) => (
                      <div className="topLevelPage searchPage">
                        <SearchView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/search/wine"
                    render={({ ...rest }) => (
                      <div className="topLevelPage wineCardPage">
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/profile"
                    render={({ ...rest }) => (
                      <div className="topLevelPage profilePage">
                        <ProfileView {...rest} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/profile/wine"
                    render={({ ...rest }) => (
                      <div className="topLevelPage wineCardPage">
                        <WineCardView {...rest} />
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <BottomNav />
          </Fragment>
        )}
      />
    </BrowserRouter>
  );
}

export default Router;
