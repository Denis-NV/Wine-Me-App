import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components

// IMPORTS END

const styles = theme => {
  return { ...theme.customStyles };
};

class ProfileView extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div>
        <h2>Profile</h2>
        <br />
        <Link to="/profile/wine">My saved wine</Link>
      </div>
    );
  }
}

ProfileView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProfileView));
