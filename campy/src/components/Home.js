import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AirportShuttle } from "@material-ui/icons";

import { Grid, Typography, IconButton } from "@material-ui/core";
import GoogleAutoComplete from "./GoogleMaps/GoogleAutoComplete";
import sittingOnCamper from "../assets/sittingOnCamper.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    background: `linear-gradient(-90deg, #c7F9CC 55%, rgba(0, 0, 0, 0) 50%), url(${sittingOnCamper}) no-repeat`,
  },

  button: {},
}));

export const Home = () => {
  const classes = useStyles();
  const [place, setPlace] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <Grid className={classes.root} container style={{ minHeight: "100vh" }}>
      <Grid item xs={8} />
      <Grid
        item
        container
        xs={4}
        alignContent="flex-end"
        justify="center"
        direction="column"
      >
        <Typography variant="h4" style={{ color: "#3EB4B6" }}>
          Where do you want to go?
        </Typography>
        <Grid container>
          <GoogleAutoComplete />
          <Typography color="secondary">
            <IconButton color="secondary" onClick={handleClick}>
              <AirportShuttle place={place} />
            </IconButton>
            Let's Go!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
