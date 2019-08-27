import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

// Components

// IMPORTS END

const styles = theme => {
  return { ...theme.customStyles };
};

class SearchView extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div className="topLevelPage" style={{ background: "#ce93d8" }}>
        <h2>Search</h2>
        <br />
        {/* {P_TEN} */}
        <Link to="/search/wine">Found wine</Link>
      </div>
    );
  }
}

SearchView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SearchView));
