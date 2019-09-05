import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Redux
import {
  setTouchScreenFlag,
  loadGlobalDictionary
} from "./redux/actions/actionsUI";
import { connect } from "react-redux";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Components
import Router from "./components/Router";

// Utils
import WithLoader from "./components/util/WithLoader";
import themeObj from "./util/theme";

// CSS
import "./css/App.scss";

// IMPORTS END

axios.defaults.baseURL =
  "https://europe-west1-wine-mate.cloudfunctions.net/api";

const theme = createMuiTheme(themeObj);

// TODO: Transfer all the external CSS styles to the @global theme
const App = props => {
  const isTouchScreen = useMediaQuery("(hover: none)");
  const isNarrow = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isSmartphone = isTouchScreen && isNarrow;

  const { setTouchScreenFlag, loadGlobalDictionary } = props;
  const { currentLang, initDataLoaded } = props.UI;

  useEffect(() => {
    setTouchScreenFlag(isTouchScreen, isSmartphone);
  }, [isTouchScreen, isSmartphone, setTouchScreenFlag]);

  useEffect(() => {
    loadGlobalDictionary(currentLang);
  }, [currentLang, initDataLoaded, loadGlobalDictionary]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <WithLoader isLoaded={initDataLoaded} component={Router} />
    </MuiThemeProvider>
  );
};

App.propTypes = {
  setTouchScreenFlag: PropTypes.func.isRequired,
  loadGlobalDictionary: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI
  };
};

const mapActionsToProps = { setTouchScreenFlag, loadGlobalDictionary };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
