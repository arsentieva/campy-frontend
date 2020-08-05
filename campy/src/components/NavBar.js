import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobilerightMenuSlider from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthOptions } from "./auth/AuthOptions";
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Typography,
  Box,
} from "@material-ui/core";
import { Person, PersonAdd, Home, Info, Explore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/campySimpleLogo.png";

//CSS Styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    background: "#80ED99",
    height: "100%",
  },
  logo: {
    maxHeight: "65px",
    marginTop: "3px",
  },

  appBar: {
    maxHeight: "80px",
  },
  listItem: {
    color: "#22577A",
  },
}));

export const NavBar = () => {
  const classes = useStyles();
  return (
    <>
      <Box component="nav">
        <AppBar
          className={classes.appBar}
          position="fixed"
          style={{ background: "#80ED99" }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <a href="/">
              <img className={classes.logo} src={logo} alt="campy logo" />
            </a>
            <AuthOptions />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
