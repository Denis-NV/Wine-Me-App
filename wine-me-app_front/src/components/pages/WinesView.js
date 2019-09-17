import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components
// import { P_TEN } from "../../util/LorenIpsum";

// IMPORTS END

const styles = theme => {
  return { ...theme.customStyles };
};

class WinesView extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <Fragment>
        <h2>Wines</h2>
        <Link to="/wines/wine">Selected wine</Link>
        <br />
        <p>UNDER CONSTRUCTION</p>
        {/* {P_TEN} */}
      </Fragment>
    );
  }
}

WinesView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(WinesView));
