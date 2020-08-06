import React from "react";
import { Grid, Typography, IconButton, Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Edit} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const AccountPage = () => {
  const classes = useStyles();
  return <Grid className={classes.root}>

  </Grid>;
};
