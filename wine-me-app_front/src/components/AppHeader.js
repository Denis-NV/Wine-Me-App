import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AssistantIco from "@material-ui/icons/Assistant";
import ViewListIco from "@material-ui/icons/ViewList";
import SearchIco from "@material-ui/icons/Search";
import AccountBoxIco from "@material-ui/icons/AccountBox";
import LinearProgress from "@material-ui/core/LinearProgress";

// IMPORTS END

const styles = theme => {
  return {
    ...theme.customStyles,
    logoImg: props => ({
      width: "80%",
      maxHeight: props.UI.isSmartphone
        ? theme.customValues.headerHeightSmart
        : theme.customValues.headerHeightWeb,
      objectFit: "contain",
      margin: "auto"
    })
  };
};

class AppHeader extends Component {
  handleChange = (event, newValue) => {
    this.props.history.push(`/${newValue}`);
  };

  render() {
    const {
      classes,
      location,
      UI: { isTouchScreen, dict, showGlobalLoading }
    } = this.props;

    const value = location.pathname.split("/")[1];

    const navMarkup = (
      <Grid item xs={8}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          aria-label="Wine Me App Header Nav"
          variant="fullWidth"
        >
          <Tab icon={<AssistantIco />} label={dict["nav_picker"]} value="" />
          <Tab icon={<ViewListIco />} label={dict["nav_wines"]} value="wines" />
          <Tab icon={<SearchIco />} label={dict["nav_search"]} value="search" />
          <Tab
            icon={<AccountBoxIco />}
            label={dict["nav_profile"]}
            value="profile"
          />
        </Tabs>
      </Grid>
    );

    return (
      <Box
        bgcolor="#455a64"
        className="mainHeader"
        style={{ minWidth: isTouchScreen ? "100%" : 450 }}
        boxShadow={2}
      >
        <Grid container>
          <Grid item xs={isTouchScreen ? 12 : 4} style={{ display: "flex" }}>
            <img
              src={isTouchScreen ? "static/logo.png" : "static/logo_tag.png"}
              alt="Logo"
              className={classes.logoImg}
            />
          </Grid>
          {!isTouchScreen && navMarkup}
        </Grid>
        {showGlobalLoading && (
          <LinearProgress
            color="secondary"
            style={{ marginTop: 0, marginBottom: 0, height: 5 }}
          />
        )}
      </Box>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { UI: state.UI };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(AppHeader)));
