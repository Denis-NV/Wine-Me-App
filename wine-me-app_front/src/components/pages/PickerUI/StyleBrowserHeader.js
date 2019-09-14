import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  setSelectedWineCountries,
  setWineStyle,
  getWineFilters,
  resetWineFilters
} from "../../../redux/actions/actionsPicker";

// MUI
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ArrowIcon from "@material-ui/icons/Navigation";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

// Components

// IMPORTS END

const MenuProps = height => {
  return {
    PaperProps: {
      style: {
        maxHeight: height
      }
    }
  };
};

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  style1: props => ({
    backaground: props.color
  }),
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

const StyleBrowserHeader = props => {
  const classes = useStyles({});
  const theme = useTheme();

  const {
    setSelectedWineCountries,
    setWineStyle,
    getWineFilters,
    resetWineFilters,
    // UI: { isSmartphone, dict },
    UI: { dict, currentLang },
    picker: { selectedStyle, wineStyles, wineCountries, selectedCountries }
  } = props;

  const selectedStyleData = wineStyles[selectedStyle];
  const wineCountriesData = {};

  wineCountries.map(
    country =>
      (wineCountriesData[country.code] = {
        ...country,
        name: dict[country.dicRef]
      })
  );

  // Handlers
  const handleChange = event => {
    setSelectedWineCountries(event.target.value);
  };

  const handleClose = () => {
    getWineFilters(selectedStyle, currentLang, selectedCountries);
  };

  const handleBackNav = event => {
    setSelectedWineCountries([]);
    setWineStyle("");
    resetWineFilters();
  };

  return (
    <Box
      bgcolor={theme.customValues.overlayColorSolid}
      px={2}
      py={3}
      boxShadow={1}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {dict[selectedStyleData["nameDicRef"]].toUpperCase()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ paddingLeft: 8, display: "flex", margin: "auto" }}
        onClick={handleBackNav}
      >
        <ArrowIcon style={{ transform: "rotate(-90deg)", marginRight: 8 }} />
        {dict["choose_another_style"]}
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">
          {dict["select_countries"]}
        </InputLabel>
        <Select
          multiple
          value={selectedCountries}
          onChange={handleChange}
          onClose={handleClose}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={wineCountriesData[value].name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps(window.innerHeight - 200)}
        >
          {wineCountries.map(country => (
            <MenuItem key={country.code} value={country.code}>
              {wineCountriesData[country.code].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

StyleBrowserHeader.propTypes = {
  UI: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired,
  setSelectedWineCountries: PropTypes.func.isRequired,
  setWineStyle: PropTypes.func.isRequired,
  getWineFilters: PropTypes.func.isRequired,
  resetWineFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI,
    picker: state.picker
  };
};

const mapActionsToProps = {
  setSelectedWineCountries,
  setWineStyle,
  getWineFilters,
  resetWineFilters
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(StyleBrowserHeader);
