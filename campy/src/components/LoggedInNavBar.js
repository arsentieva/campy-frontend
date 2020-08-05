import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobilerightMenuSlider from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
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
import {
  Person,
  PersonAdd,
  Home,
  Info,
  MeetingRoom,
  Explore,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/campySimpleLogo.png";

//CSS Styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    background: "#57CC99",
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

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/",
  },

  {
    listIcon: <Explore />,
    listText: "Explore",
    listPath: "/locations",
  },
  {
    listIcon: <Person />,
    listText: "Login",
    listPath: "/login",
  },
  {
    listIcon: <PersonAdd />,
    listText: "Sign Up",
    listPath: "/sign-up",
  },
  {
    listIcon: <Info />,
    listText: "About",
    listPath: "/about",
  },
];

export const LoggedInNavBar = () => {
  const [state, setState] = useState({
    right: false,
  });
  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };
  const classes = useStyles();

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(slider, false)}
    >
      <a href="/">
        <img className={classes.logo} src={logo} alt="campy logo" />
      </a>
      <Divider />
      <List>
        {menuItems.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText
              className={classes.listItem}
              primary={listItem.listText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box component="nav">
        <AppBar
          className={classes.appBar}
          position="fixed"
          style={{ background: "#57CC99" }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <a href="/">
              <img className={classes.logo} src={logo} alt="campy logo" />
            </a>

            <IconButton onClick={toggleSlider("right", true)}>
              <Typography
                variant="h5"
                style={{ color: "#d3f5ef", textAlign: "end" }}
              >
                MENU
              </Typography>
              <MenuIcon style={{ color: "#d3f5ef" }} />
            </IconButton>

            <MobilerightMenuSlider
              anchor="right"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobilerightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
