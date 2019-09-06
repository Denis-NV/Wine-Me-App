import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";

// Components

// IMPORTS END

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  style1: props => ({
    backaground: props.color
  })
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
      <Grid item>
        <Typography variant="h5">
          {dict[selectedStyleData["nameDicRef"]]}
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">
            Select Countries
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
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );

  return isSmartphone ? smartphoneMarkup : webMarkup;
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
