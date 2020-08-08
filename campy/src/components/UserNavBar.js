import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./auth/Logout";
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
  Avatar,
  Box,
} from "@material-ui/core";
import {
  Home,
  Info,
  Explore,
  AccountBox,
  AddLocation,
  CalendarToday,
  Email,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/lightLogo2.png";
import logo2 from "../assets/darkLogo.png";

import { useAuth } from "../context/AuthContext";

//CSS Styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    background: "#FFFFC7",
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
    color: "#2D709F",
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/",
  },
  {
    listIcon: <AccountBox />,
    listText: "My Account",
    listPath: "/account",
  },
  {
    listIcon: <AddLocation />,
    listText: "Host a location",
    listPath: "/add-location",
  },
  {
    listIcon: <CalendarToday />,
    listText: "My Adventures",
    listPath: "/schedule",
  },
  {
    listIcon: <Email />,
    listText: "My Messages",
    listPath: "/my-messages",
  },

  {
    listIcon: <Explore />,
    listText: "Explore",
    listPath: "/locations",
  },

  {
    listIcon: <Info />,
    listText: "About",
    listPath: "/about",
  },
];

export const UserNavBar = () => {
  const { authTokens } = useAuth();
  const userFirstName = authTokens.user_first_name;
  const userImageUrl = authTokens.image_url;
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
        <img className={classes.logo} src={logo2} alt="campy logo" />
      </a>
      <Divider />
      <List>
        <ListItem justify="center">
          <Avatar src={userImageUrl} />
          <ListItemText className={classes.listItem}>
            Hello {`${userFirstName}`}!
          </ListItemText>
        </ListItem>
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
        <Divider />
        <Logout />
      </List>
    </Box>
  );

  return (
    <>
      <Box component="nav">
        <AppBar
          className={classes.appBar}
          position="fixed"
          style={{ background: "#245B7F", color: "#FFFFC7" }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <a href="/">
              <img className={classes.logo} src={logo} alt="campy logo" />
            </a>

            <IconButton onClick={toggleSlider("right", true)}>
              <Typography
                variant="h5"
                style={{ color: "#FFFFC7", textAlign: "end" }}
              >
                MENU
              </Typography>
              <MenuIcon style={{ color: "#FFFFC7" }} />
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
