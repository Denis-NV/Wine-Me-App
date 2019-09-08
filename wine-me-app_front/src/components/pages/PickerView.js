import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

// Components
import StylePickerComp from "./PickerUI/StylePickerComp";
import StyleBrowser from "./PickerUI/StyleBrowser";

// Utils
import WithLoader from "../util/WithLoader";

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
      picker: { countriesLoaded, selectedStyle }
    } = this.props;

    return (
      <Fragment>
        {selectedStyle === "" ? (
          <Box p={paddingFactor}>
            <StylePickerComp paddingFactor={paddingFactor} />{" "}
          </Box>
        ) : (
          <WithLoader isLoaded={countriesLoaded} component={StyleBrowser} />
        )}
      </Fragment>
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
