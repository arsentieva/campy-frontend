import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';

import kristen from "../assets/team/kristen.jpg";
import aaron from "../assets/team/aaron.jpeg";
import anna from "../assets/team/anna.jpeg";
import arom from "../assets/team/arom.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#0C2131",
    bottom: 0,
    top: "95%",
    color: "#FFFFC7",
  },

  footer: {
    display: "grid",
    alignItems: "center",
  },

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5, 3),
    },
    justifyContent: "center",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <div className={classes.root}>
        <a href="https://github.com/chaunceykm" alt="Kristen Link">
          <Avatar alt="Kristen" src={kristen} />
        </a>
        <a href="https://github.com/arsentieva">
          <Avatar alt="Anna" src={anna} />
        </a>
        <a href="https://github.com/aromjhee">
          <Avatar alt="Arom" src={arom} />
        </a>
        <a href="https://github.com/AaronTheBruce/">
          <Avatar alt="Aaron" src={aaron} />
        </a>
        <Typography className={classes.footer}>© Copyright 2020</Typography>
      </div>
    </AppBar>
  );
};
