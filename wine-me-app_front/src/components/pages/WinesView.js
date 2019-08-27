import React, { Component } from "react";
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
      <div className="topLevelPage" style={{ background: "#f06292" }}>
        <h2>Wines</h2>
        <br />
        {/* {P_TEN} */}
        <Link to="/wines/wine">Selected wine</Link>
      </div>
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
