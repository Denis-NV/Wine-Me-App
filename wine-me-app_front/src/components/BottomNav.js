import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// MUI Icons
import AssistantIco from "@material-ui/icons/Assistant";
import ViewListIco from "@material-ui/icons/ViewList";
import SearchIco from "@material-ui/icons/Search";
import AccountBoxIco from "@material-ui/icons/AccountBox";

// IMPORTS END

const styles = theme => {
  return {
    ...theme.customStyles,
    bottomNav: {
      background: "rgb(70, 70, 70)",
      position: "fixed",
      width: "100%",
      bottom: "0"
    },
    navButton: {
      color: "#FFFFFF"
    }
  };
};

class BottomNav extends Component {
  handleSelection = (event, newValue) => {
    // console.log(newValue);

    this.props.history.push(`/${newValue}`);
  };

  render() {
    const { isTouchScreen, classes, location } = this.props;

    const value = location.pathname.split("/")[1];

    const menuMarkup = isTouchScreen ? (
      <BottomNavigation
        onChange={this.handleSelection}
        className={classes.bottomNav}
        value={value}
      >
        <BottomNavigationAction
          label="Picker"
          value=""
          icon={<AssistantIco />}
          className={classes.navButton}
        />
        <BottomNavigationAction
          label="Wines"
          value="wines"
          icon={<ViewListIco />}
          className={classes.navButton}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIco />}
          className={classes.navButton}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountBoxIco />}
          className={classes.navButton}
        />
      </BottomNavigation>
    ) : null;

    return menuMarkup;
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  isTouchScreen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(BottomNav)));
