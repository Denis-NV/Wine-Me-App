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

class WineCardView extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div>
        <h2>Wines Card</h2>
        <br />
        {/* {P_TEN} */}
      </div>
    );
  }
}

WineCardView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(WineCardView));
