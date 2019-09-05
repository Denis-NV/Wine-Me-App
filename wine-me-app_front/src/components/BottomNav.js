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
    ...theme.customStyles
  };
};

class BottomNav extends Component {
  handleSelection = (event, newValue) => {
    this.props.history.push(`/${newValue}`);
  };

  render() {
    const {
      location,
      UI: { isTouchScreen, dict }
    } = this.props;

    const value = location.pathname.split("/")[1];

    const menuMarkup = isTouchScreen ? (
      <nav className="bottomNav">
        <BottomNavigation onChange={this.handleSelection} value={value}>
          <BottomNavigationAction
            label={dict["nav_picker"]}
            value=""
            icon={<AssistantIco />}
          />
          <BottomNavigationAction
            label={dict["nav_wines"]}
            value="wines"
            icon={<ViewListIco />}
          />
          <BottomNavigationAction
            label={dict["nav_search"]}
            value="search"
            icon={<SearchIco />}
          />
          <BottomNavigationAction
            label={dict["nav_profile"]}
            value="profile"
            icon={<AccountBoxIco />}
          />
        </BottomNavigation>
      </nav>
    ) : null;

    return menuMarkup;
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(BottomNav)));
