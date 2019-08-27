import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// IMPORTS END

const styles = theme => {
  return {
    ...theme.customStyles
    // container: {
    //   position: "fixed",
    //   zIndex: "1",
    //   height: "5vh",
    //   top: "0",
    //   width: "100%",
    //   maxWidth: "960px",
    //   background: "#d1c4e9"
    // }
  };
};

class AppHeader extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <header className="mainHeader">
        <h1>Wine Me App Header !!!</h1>
      </header>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AppHeader));
