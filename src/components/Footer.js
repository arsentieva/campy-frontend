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
    justifyContent: "center",
    alignItems: "center"
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
        <a href="https://www.linkedin.com/in/kristen-chauncey-2b971a179/" rel="noopener noreferrer" target="_blank">
          <Avatar alt="Kristen" src={kristen} />
        </a>
        <a href="https://www.linkedin.com/in/annaarsentieva/" rel="noopener noreferrer" target="_blank">
          <Avatar alt="Anna" src={anna} />
        </a>
        <a href="https://www.linkedin.com/in/arom-jhee/" rel="noopener noreferrer" target="_blank">
          <Avatar alt="Arom" src={arom} />
        </a>
        <a href="https://www.linkedin.com/in/aaronbruce555/" rel="noopener noreferrer" target="_blank">
          <Avatar alt="Aaron" src={aaron} />
        </a>
        <Typography className={classes.footer}>© Copyright 2020</Typography>
      </div>
    </AppBar>
  );
};
