import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthOptions } from "./auth/AuthOptions";
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
import { Home, Info, Explore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/lightLogo2.png";
import logo2 from "../assets/darkLogo.png";

//CSS Styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    // background: '#f0eace',
    background: '#e2e8f0',
    height: "100%",
  },
  logo: {
    maxHeight: "65px",
    margin: "20px 0 10px 3px",
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
    listIcon: <Info />,
    listText: "About",
    listPath: "/about",
  },
];

export const NavBar = () => {
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
        <AuthOptions />
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
          <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", }}>
            <a href="/">
              <img className={classes.logo} src={logo} alt="campy logo" />
            </a>
            <div>
              <IconButton component="a" href="/locations">
                {/* <Explore style={{ color: "#FFFFC7" }} /> */}
                <Explore style={{ color: "pink" }} />
                <Typography
                  variant="h5"
                  style={{ color: "pink", textAlign: "end", marginLeft: "5px", fontWeight: "600" }}
                >
                  Explore
                </Typography>
              </IconButton>
              <IconButton onClick={toggleSlider("right", true)}>
                {/* <Typography
                  variant="h5"
                  style={{ color: "#FFFFC7", textAlign: "end", marginLeft: "10px" }}
                >
                  MENU
                </Typography> */}
                <MenuIcon style={{ color: "#FFFFC7" }} fontSize="large" />
              </IconButton>
            </div>

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
