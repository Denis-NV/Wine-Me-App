import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Redux
import { setTouchScreenFlag, loadInitAssets } from "./redux/actions/actionsUI";
import { connect } from "react-redux";

// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

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

const useStyles = makeStyles({
  "@global": {
    body: props => ({
      backgroundColor: "#cfd8dc",
      minWidth: props.min_width
    })
  }
});

// TODO: Transfer all the external CSS styles to the @global theme
const App = props => {
  const isTouchScreen = useMediaQuery("(hover: none)");
  const isNarrow = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isSmartphone = isTouchScreen && isNarrow;

  useStyles({ min_width: isTouchScreen ? "auto" : 450 });

  const { setTouchScreenFlag, loadInitAssets } = props;
  const { currentLang, initDataLoaded } = props.UI;

  useEffect(() => {
    setTouchScreenFlag(isTouchScreen, isSmartphone);
  }, [isTouchScreen, isSmartphone, setTouchScreenFlag]);

  useEffect(() => {
    loadInitAssets(currentLang);
  }, [currentLang, initDataLoaded, loadInitAssets]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <WithLoader isLoaded={initDataLoaded} component={Router} />
    </MuiThemeProvider>
  );
};

App.propTypes = {
  setTouchScreenFlag: PropTypes.func.isRequired,
  loadInitAssets: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI
  };
};

const mapActionsToProps = { setTouchScreenFlag, loadInitAssets };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
