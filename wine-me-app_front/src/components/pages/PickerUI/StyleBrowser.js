import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { setPinnedWineFilters } from "../../../redux/actions/actionsPicker";

// MUI
// import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import lime from "@material-ui/core/colors/lime";

// Icons
import ProducerIcon from "../../icons/ProducerIcon";
import RegionIcon from "../../icons/RegionIcon";
import GrapeIcon from "../../icons/GrapeIcon";

// Components
import StyleBrowserHeader from "./StyleBrowserHeader";

// IMPORTS END

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  menuItem: props => ({
    style1: props
  }),
  chipRoot: {
    margin: 2,
    height: "auto",
    width: "fit-content",
    minHeight: 32,
    borderRadius: 22,
    padding: 2,
    maxWidth: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "@media (max-width: 700px)": {
      paddingRight: 7
    }
    // "&:hover > .MuiChip-deleteIcon": {
    //   transform: "rotate(180deg)",
    //   transition: "transform 150ms ease-out"
    // }
  },
  chipLabel: {
    whiteSpace: "normal",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12,
    "@media (max-width: 700px)": {
      maxWidth: 60,
      paddingLeft: 3,
      paddingRight: 3
    }
  },
  chipDelete: {
    height: 25,
    width: 25,
    margin: 0,
    "@media (max-width: 700px)": {
      marginLeft: -3,
      marginRight: -5
    },
    // transform: "rotate(45deg)",
    // transition: "transform 150ms ease-out",
    "&:hover": {
      fill: "currentColor",
      color: "rgba(0, 0, 0, 0.26)"
    }
  },
  chipAdd: {
    height: 25,
    width: 25,
    margin: 0,

    "@media (max-width: 700px)": {
      marginLeft: -3,
      marginRight: -5
    },
    transform: "rotate(45deg)",
    // transition: "transform 150ms ease-out",
    "&:hover": {
      fill: "currentColor",
      color: "rgba(0, 0, 0, 0.26)"
    }
  },
  chipAvatar: {
    width: 40,
    height: 40,
    marginRight: 0
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
    justifyContent: "flex-start",
    alignItems: "center"
  }
}));

const StyleBrowser = props => {
  const classes = useStyles({});
  // const theme = useTheme();

  const {
    setPinnedWineFilters,
    UI: { dict },
    picker: { selectedStyle, filtersLoaded, wineFilters }
  } = props;

  // Handlers

  const handleClick = (type, id) => event => {
    setPinnedWineFilters(type, id);

    // console.log(wineFilters);
  };

  // Markup
  const constructChips = (type, showCountry = false) => {
    let typeChips = [];
    const typeChipsTop = [];
    const typeChipsBottom = [];
    const curTypePinned = wineFilters[type].some(item => item.pinned);
    const otherTypePinned = wineFilters.some((filter, index) => {
      return index !== type && filter.some(item => item.pinned);
    });

    wineFilters[type].forEach((item, index) => {
      const isFiltered = item.filteredBy.length > 0;
      const shade = Math.max(9 - index, 0) * 100;
      const avtColor = index === 0 ? "rgb(220, 220, 220)" : "#616161";
      typeChips = item.pinned ? typeChipsTop : typeChipsBottom;

      (!otherTypePinned || isFiltered) &&
        typeChips.push(
          <Chip
            key={item.id}
            variant={item.pinned || !curTypePinned ? "default" : "outlined"}
            label={
              item.name + (showCountry ? ` (${dict[item.countryDicRef]})` : "")
            }
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel,
              deleteIcon: item.pinned ? classes.chipDelete : classes.chipAdd
            }}
            clickable={true}
            onClick={handleClick(type, item.id)}
            onDelete={!curTypePinned ? null : () => {}}
            avatar={
              <Avatar
                className={classes.chipAvatar}
                style={{
                  background: lime[shade],
                  color: avtColor
                }}
              >{`${Math.round(
                item.styles[selectedStyle + "_percent"] * 100
              )}%`}</Avatar>
            }
          />
        );
      typeChips = [...typeChipsTop, ...typeChipsBottom];
    });
    return typeChips;
  };

  const constructIcons = (icon, label) => {
    return (
      <Grid item xs={4} className={classes.browserHeaderCol}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box component={icon} className={classes.browserIcon} />
          <Typography variant="subtitle1" display="block" color="textSecondary">
            {label.toUpperCase()}
          </Typography>
        </Box>
      </Grid>
    );
  };

  const browserMarkup = (
    <Box p={2} pt={4}>
      <Grid container>
        {constructIcons(RegionIcon, dict["regions"])}
        {constructIcons(GrapeIcon, dict["grapes"])}
        {constructIcons(ProducerIcon, dict["producers"])}
      </Grid>
      <Box
        component="hr"
        borderColor="primary.main"
        borderTop={0}
        borderLeft={0}
        borderRight={0}
      />
      {!filtersLoaded && (
        <LinearProgress
          color="secondary"
          style={{ marginTop: -6, marginBottom: 4, height: 2 }}
        />
      )}
      <Grid container>
        <Grid item xs={4} className={classes.browserContentCol}>
          {constructChips(0, true)}
        </Grid>
        <Grid item xs={4} className={classes.browserContentCol}>
          {constructChips(1, false)}
        </Grid>
        <Grid item xs={4} className={classes.browserContentCol}>
          {constructChips(2, false)}
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <StyleBrowserHeader />
      </Grid>
      <Grid item xs={12} sm={8}>
        {browserMarkup}
      </Grid>
    </Grid>
  );
};

StyleBrowser.propTypes = {
  UI: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired,
  setPinnedWineFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI,
    picker: state.picker
  };
};

const mapActionsToProps = { setPinnedWineFilters };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(StyleBrowser);
