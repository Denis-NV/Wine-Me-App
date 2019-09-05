import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components

// IMPORTS END

const styles = theme => {
  return { ...theme.customStyles };
};

class CompTemplate extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div>
        <p>CompTemplate</p>
      </div>
    );
  }
}

CompTemplate.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CompTemplate));
