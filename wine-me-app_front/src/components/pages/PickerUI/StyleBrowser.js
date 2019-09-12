import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  setSelectedWineCountries,
  setWineStyle
} from "../../../redux/actions/actionsPicker";

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
import Button from "@material-ui/core/Button";

// Icons
import ProducerIcon from "../../icons/ProducerIcon";
import RegionIcon from "../../icons/RegionIcon";
import GrapeIcon from "../../icons/GrapeIcon";
import ArrowIcon from "@material-ui/icons/Navigation";

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
  },
  browserHeaderCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  browserIcon: {
    width: "40%",
    height: "auto",
    display: "block",
    color: theme.palette.primary.dark
  },
  browserContentCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  }
}));

const StyleBrowser = props => {
  const classes = useStyles({});
  const theme = useTheme();

  const {
    setSelectedWineCountries,
    setWineStyle,
    // UI: { isSmartphone, dict },
    UI: { dict },
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

  const handleBackNav = event => {
    setSelectedWineCountries([]);
    setWineStyle("");
  };

  // Markup
  const browserMarkup = (
    <Box p={2} pt={4}>
      <Grid container>
        <Grid item xs={4} className={classes.browserHeaderCol}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <RegionIcon className={classes.browserIcon} />
            <Typography
              variant="subtitle1"
              display="block"
              color="textSecondary"
            >
              {dict["regions"].toUpperCase()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} className={classes.browserHeaderCol}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <GrapeIcon className={classes.browserIcon} />
            <Typography
              variant="subtitle1"
              display="block"
              color="textSecondary"
            >
              {dict["grapes"].toUpperCase()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} className={classes.browserHeaderCol}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ProducerIcon className={classes.browserIcon} />
            <Typography
              variant="subtitle1"
              display="block"
              color="textSecondary"
            >
              {dict["producers"].toUpperCase()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        component="hr"
        borderColor="primary.main"
        borderTop={0}
        borderLeft={0}
      />
      <Grid container>
        <Grid item xs={4} className={classes.browserContentCol}>
          <Chip key="test1" label="Test" className={classes.chip} />
          <Chip key="test2" label="Test" className={classes.chip} />
          <Chip key="test3" label="Test" className={classes.chip} />
          <Chip key="test4" label="Test" className={classes.chip} />
          <Chip key="test5" label="Test" className={classes.chip} />
          <Chip key="test6" label="Test" className={classes.chip} />
          <Chip key="test7" label="Test" className={classes.chip} />
        </Grid>
        <Grid item xs={4} className={classes.browserContentCol}>
          <Chip key="test11" label="Test" className={classes.chip} />
          <Chip key="test12" label="Test" className={classes.chip} />
          <Chip key="test13" label="Test" className={classes.chip} />
        </Grid>
        <Grid item xs={4} className={classes.browserContentCol}>
          <Chip key="test21" label="Test" className={classes.chip} />
          <Chip key="test22" label="Test" className={classes.chip} />
          <Chip key="test23" label="Test" className={classes.chip} />
          <Chip key="test24" label="Test" className={classes.chip} />
          <Chip key="test25" label="Test" className={classes.chip} />
        </Grid>
      </Grid>
    </Box>
  );

  // const smartphoneMarkup = <Fragment>Smartphone</Fragment>;
  const webMarkup = (
    <Grid container>
      <Grid item xs={12} sm={4}>
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
            <ArrowIcon
              style={{ transform: "rotate(-90deg)", marginRight: 8 }}
            />
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
      </Grid>
      <Grid item xs={12} sm={8}>
        {browserMarkup}
      </Grid>
    </Grid>
  );

  return webMarkup;
  // return isSmartphone ? smartphoneMarkup : webMarkup;
};

StyleBrowser.propTypes = {
  UI: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired,
  setSelectedWineCountries: PropTypes.func.isRequired,
  setWineStyle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI,
    picker: state.picker
  };
};

const mapActionsToProps = {
  setSelectedWineCountries,
  setWineStyle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(StyleBrowser);
