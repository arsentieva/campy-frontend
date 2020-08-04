import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Link,
  Box,
} from "@material-ui/core";
import { Person, PersonAdd } from "@material-ui/icons";
import logo from "../assets/campySimpleLogo.png";

const useStyles = makeStyles({
  logo: {
    maxHeight: "65px",
    marginTop: "3px",
  },

  appBar: {
    maxHeight: "80px",
  },
});

export const NavBar = () => {
  const classes = useStyles();

  return (
    <Box component="nav">
      <AppBar
        className={classes.appBar}
        position="fixed"
        justify="space-between"
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <a href="/">
            <img className={classes.logo} src={logo} alt="campy logo" />
          </a>
          
          <Typography>
            <Link href="/login" color="secondary" variant="inherit">
              <IconButton>
                <Person />
              </IconButton>
              Login
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
