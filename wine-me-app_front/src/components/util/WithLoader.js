import React, { Fragment } from "react";

// NUI
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  progress: {}
}));

const WithLoading = ({ component: Component, isLoaded, ...rest }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {isLoaded ? (
        <Component {...rest} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress
            className={classes.progress}
            size={70}
            thickness={3}
            color="primary"
          />
        </Box>
      )}
    </Fragment>
  );
};

export default WithLoading;
