import React from "react";
import { AppBar, Typography, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#0C2131",
    bottom: 0,
    top: "97%",
    color: "#FFFFC7",
  },
  footer: {
    textAlign: "center",
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Typography className={classes.footer}>© Copyright 2020</Typography>
    </AppBar>
  );
};
