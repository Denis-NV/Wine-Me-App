import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";

// Redux
import { connect } from "react-redux";
import { setWineStyleFocus } from "../../../redux/actions/actionsUI";

// MUI
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Components

// Data
import stylesData from "../../../data/wineStyles";

// IMPORTS END
// TODO 1. wire style focus via redux state
// TODO: 2. load dictionary during intial app load
// TODO 3. tidy up card width and height calculations
// TODO 4. sitch from CSS to Sass
// TODO 5. make a nice header with nav
// TODO: 6. tidy up card image loading / resizing
// TODO 7. Decide on the color scheme

const useStyles = makeStyles(theme => ({
  ...theme.customStyles,
  cardAction: props => ({
    height: theme.breakpoints.values[props.maxBreakpoint] / 2.8,
    backgroundColor: theme.customValues.overlayColorSolid
  }),
  cardImage: {
    height: "100%"
  },
  cardText: {
    textAlign: "center",
    backgroundColor: theme.customValues.overlayColorOpacity,
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  carouselWrapper: {
    overflow: "hidden",
    paddingBottom: 3
  },
  carouselContainer: props => ({
    flexWrap: "nowrap",
    transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    transform: `translateX(${-props.focusedStyle * props.transStep}px)`
  }),
  carouselCardAction: props => ({
    height: props.cardHeight,
    width: props.cardWidth
  })
}));

const StylePickerComp = props => {
  const {
    setWineStyleFocus,
    UI: { isSmartphone, focusedWineStyle }
  } = props;

  // Positioning

  const classes = useStyles({
    cardWidth:
      window.innerWidth - props.paddingFactor * useTheme().spacing() * 2,
    cardHeight: window.innerHeight - 150,
    transStep: window.innerWidth,
    focusedStyle: focusedWineStyle,
    maxBreakpoint: props.UI.maxBreakpoint
  });

  // Event Handlers

  const onSwipeLeft = () => {
    const newIndex = Math.min(
      Object.keys(stylesData).length - 1,
      focusedWineStyle + 1
    );
    setWineStyleFocus(newIndex);
  };

  const onSwipeRight = () => {
    const newIndex = Math.max(0, focusedWineStyle - 1);
    setWineStyleFocus(newIndex);
  };

  // Markup
  const cards = [];

  // eslint-disable-next-line
  for (const style in stylesData) {
    const styleObj = stylesData[style];
    const nameStr = styleObj.nameDicRef;
    const descStr = styleObj.descDicRef;

    // Card Markup
    const cardMarkup = (
      <Grid item key={style} sx={12} sm={6} md={3}>
        <Card>
          <CardActionArea
            className={
              isSmartphone ? classes.carouselCardAction : classes.cardAction
            }
          >
            <CardMedia
              component="img"
              alt={nameStr}
              image={styleObj.imageUrl}
              title={nameStr}
              className={classes.cardImage}
              id={style}
              onLoad={event => {
                /* console.log(event.target.id); */
              }}
            />
            <CardContent className={classes.cardText}>
              <Typography gutterBottom variant="h5" component="h2">
                {nameStr}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {descStr}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
    cards.push(cardMarkup);
  }

  const gridMarkup = (
    <Grid container spacing={2}>
      {cards}
    </Grid>
  );

  // Caurusel markup
  const carouselMarkup = (
    <Swipe
      className={classes.carouselWrapper}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    >
      <Grid
        container
        spacing={props.paddingFactor * 2}
        direction="row"
        className={classes.carouselContainer}
      >
        {cards}
      </Grid>
    </Swipe>
  );

  return <Fragment>{isSmartphone ? carouselMarkup : gridMarkup}</Fragment>;
};

StylePickerComp.propTypes = {
  picker: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  setWineStyleFocus: PropTypes.func.isRequired,
  paddingFactor: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return { picker: state.picker, UI: state.UI };
};

const mapActionsToProps = { setWineStyleFocus };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(StylePickerComp);
