import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AssistantIco from "@material-ui/icons/Assistant";
import ViewListIco from "@material-ui/icons/ViewList";
import SearchIco from "@material-ui/icons/Search";
import AccountBoxIco from "@material-ui/icons/AccountBox";

// IMPORTS END

const styles = theme => {
  return {
    ...theme.customStyles,
    appBar: { flexDirection: "row" },
    logoCont: {
      margin: "auto",
      padding: "0px 20px 0 20px",
      "& img": {
        objectFit: "cover"
      },
      "@media (max-width: 600px)": {
        padding: 0,
        "& img": {
          width: 150,
          height: "auto"
        }
      }
    }
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
      UI: { isTouchScreen, dict }
    } = this.props;

    const value = location.pathname.split("/")[1];

    const navMarkup = (
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
    );

    return (
      <div className="mainHeader">
        <AppBar position="relative" className={classes.appBar}>
          <div className={classes.logoCont}>
            <img
              src={isTouchScreen ? "static/logo.png" : "static/logo_tag.png"}
              height="72"
              alt="Logo"
            />
          </div>
          {!isTouchScreen && navMarkup}
        </AppBar>
      </div>
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
