import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// Components

// Data
import stylesData from "../../data/wineStyles";

// IMPORTS END

const styles = theme => {
  return {
    ...theme.customStyles,
    mainContainer: {
      paddingTop: "16px"
    },
    card: {},
    cardText: {
      textAlign: "center",
      backgroundColor: "#bcaaa4"
    }
  };
};

class PickerView extends Component {
  render() {
    const { classes } = this.props;

    const cards = [];

    for (const style in stylesData) {
      const styleObj = stylesData[style];
      const nameStr = styleObj.nameDicRef;
      const descStr = styleObj.descDicRef;

      const cardMarkup = (
        <Grid item key={style} sx={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={nameStr}
                image={styleObj.imageUrl}
                title={nameStr}
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

    return (
      <Container className={classes.mainContainer}>
        <Grid container spacing={3}>
          {cards}
        </Grid>
      </Container>
    );
  }
}

PickerView.propTypes = {
  classes: PropTypes.object.isRequired,
  picker: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    picker: state.picker
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PickerView));
