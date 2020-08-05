import React from "react";
import { AppBar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#39A5A7",
    bottom: 0,
    top: "92%",
    color: "#22577A",
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
      <br />
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Typography>
            <a
              href="https://github.com/arsentieva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub color="primary" />
            </a>
            <a
              href="mailto:anna.arsentieva@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anna Arsentieva
            </a>
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <a
              href="https://github.com/AaronTheBruce"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub color="primary" />
            </a>
            <a
              href="mailto:aaronbruce555@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aaron Bruce
            </a>
          </Typography>
        </Grid>

        <Grid item>
          {" "}
          <Typography>
            <a
              href="https://github.com/aromjhee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub color="primary" />
            </a>
            <a
              href="mailto:aromjhee@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arom Jhee
            </a>
          </Typography>
        </Grid>
        <Grid item>
          {" "}
          <Typography>
            <a
              href="https://github.com/chaunceykm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub color="primary" />
            </a>
            <a
              href="mailto:kristen.michelle82@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kristen Chauncey
            </a>
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
};
