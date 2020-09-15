import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import sittingOnCamper from "../assets/sittingOnCamper.jpg";

const useStyles = makeStyles((theme) => ({
  heroImage: {
    flexGrow: 1,
    backgroundImage: `url(${sittingOnCamper})`,
    height: "100vh",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: "40px",
  },
  heroMessage: {
    width: "100%",
    backgroundColor: "rgba(36, 91, 127, 0.3)",
    color: "#f0eace",
    display: "grid",
    justifyItems: "center",
  },
  anchor: {
    // color: "#f0eace",
    color: "pink",
    fontWeight: "700",
    textDecoration: "underline",
  }
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      className={classes.heroImage}
    >
      <Grid
        xs={12}
        className={classes.overlay}
        container
        item
        direction="column"
        justify="center"
        alignContent="center"
      >
        <Grid item className={classes.heroMessage}>
          <Typography variant="h1">Where do you want to go?</Typography>
          <Typography variant="h4">
            Click <a href="/locations" className={classes.anchor}>Explore</a> to plan your next adventure!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
