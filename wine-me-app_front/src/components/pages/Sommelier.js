import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// IMPORTS END

const styles = {};

class Sommelier extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <p>Sommelier page</p>
      </div>
    );
  }
}

Sommelier.propTypes = {
  classes: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    picker: state.picker
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Sommelier));
