import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import { P_TEN } from "../../util/LorenIpsum";

// IMPORTS END

const styles = theme => {
  return { ...theme.customStyles };
};

class PickerView extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div className="topLevelPage" style={{ background: "#e57373" }}>
        <h2>Picker</h2>
        <br />
        {P_TEN}
      </div>
    );
  }
}

PickerView.propTypes = {
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
)(withStyles(styles)(PickerView));
