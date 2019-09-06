import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

// Components
import StylePickerComp from "./PickerUI/StylePickerComp";
import StyleBrowser from "./PickerUI/StyleBrowser";

// IMPORTS END

const paddingFactor = 2;

const styles = theme => {
  return {
    ...theme.customStyles
  };
};

class PickerView extends Component {
  render() {
    const {
      picker: { selectedStyle }
    } = this.props;

    return (
      <Box p={paddingFactor}>
        {selectedStyle === "" ? (
          <StylePickerComp paddingFactor={paddingFactor} />
        ) : (
          <StyleBrowser />
        )}
      </Box>
    );
  }
}

PickerView.propTypes = {
  classes: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    picker: state.picker,
    UI: state.UI
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PickerView));
