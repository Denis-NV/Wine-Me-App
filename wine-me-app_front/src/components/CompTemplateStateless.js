import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";

// Components

// IMPORTS END

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  style1: props => ({
    backaground: props.color
  })
}));

const CompTemplateStateless = props => {
  const classes = useStyles({});

  return <Fragment>{CompTemplateStateless}</Fragment>;
};

CompTemplateStateless.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CompTemplateStateless);
