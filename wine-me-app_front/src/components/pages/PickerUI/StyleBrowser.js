import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";

// Components

// IMPORTS END

const MenuProps = heigth => {
  return {
    PaperProps: {
      style: {
        maxHeight: heigth
      }
    }
  };
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  menuItem: props => ({
    style1: props
  }),
  formControl: {
    minWidth: 120,
    width: "100%",
    marginTop: theme.spacing(3)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const StyleBrowser = props => {
  const classes = useStyles({});
  const theme = useTheme();

  const [personName, setPersonName] = React.useState([]);

  const {
    UI: { isSmartphone, dict },
    picker: { selectedStyle, wineStyles }
  } = props;

  const selectedStyleData = wineStyles[selectedStyle];

  // Handlers
  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const smartphoneMarkup = <Fragment>Smartphone</Fragment>;
  const webMarkup = (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Box
          bgcolor={theme.customValues.overlayColorSolid}
          px={2}
          py={3}
          boxShadow={1}
        >
          <Typography variant="h5">
            {dict[selectedStyleData["nameDicRef"]]}
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">
              {dict["select_countries"]}
            </InputLabel>
            <Select
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps(window.innerHeight - 200)}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box p={2}>Browser</Box>
      </Grid>
    </Grid>
  );

  return webMarkup;
  // return isSmartphone ? smartphoneMarkup : webMarkup;
};

StyleBrowser.propTypes = {
  UI: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI,
    picker: state.picker
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(StyleBrowser);
