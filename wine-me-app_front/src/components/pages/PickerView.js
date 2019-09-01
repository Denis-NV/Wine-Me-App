import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";

// Components
import StylePickerComp from "./PickerUI/StylePickerComp";

// IMPORTS END

const paddingFactor = 2;

const styles = theme => {
  return {
    ...theme.customStyles,
    mainContainer: {
      padding: `${theme.spacing() * paddingFactor}px`
    }
  };
};

class PickerView extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.mainContainer}>
        <StylePickerComp paddingFactor={paddingFactor} />
      </Container>
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
