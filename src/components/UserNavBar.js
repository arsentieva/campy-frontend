import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./auth/Logout";
import MobilerightMenuSlider from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, ListItem, IconButton, ListItemIcon, ListItemText, Divider, List, Typography, Avatar, Box} from "@material-ui/core";
import { Home, Info, Explore, AccountBox, AddLocation, CalendarToday, Email} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/lightLogo2.png";
import logo2 from "../assets/darkLogo.png";

import { CampyContext } from "../CampyContext";

//CSS Styles
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    background: "#e2e8f0",
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


export const UserNavBar = () => {
  const { currentUser } = useContext(CampyContext);
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
      listIcon: <AccountBox />,
      listText: "My Account",
      listPath: `/user/account`,
    },
    {
      listIcon: <AddLocation />,
      listText: "Host a location",
      listPath: `/user/add-location`,
    },
    {
      listIcon: <CalendarToday />,
      listText: "My Adventures",
      listPath: `/user/schedule`,
    },
    {
      listIcon: <Email />,
      listText: "My Messages",
      listPath: `/user/messages`,
    },

    {
      listIcon: <Info />,
      listText: "About",
      listPath: "/about",
    },
  ];

  const [state, setState] = useState({ right: false });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const classes = useStyles();

  const sideList = (slider) => (
    <Box 
      className={classes.menuSliderContainer}
      component="div"  
      onClick={toggleSlider("right", false)}
    >
      <a href="/">
        <img className={classes.logo} src={logo2} alt="campy logo" />
      </a>
      <Divider />
      <List>
        <ListItem style={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={currentUser.image_url} style={{ marginLeft: "30px" }} />
          <ListItemText className={classes.listItem} style={{ marginLeft: "10px" }}>
            Hello {`${currentUser.first_name}`}!
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
          <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
            <a href="/">
              <img className={classes.logo} src={logo} alt="campy logo" />
            </a>
            <div>
              <IconButton component="a" href="/locations">
                <Explore style={{ color: "pink" }} />
                <Typography
                  variant="h5"
                  style={{ color: "pink", textAlign: "end", marginLeft: "5px", fontWeight: "600" }}
                >
                  Explore
                </Typography>
              </IconButton>
              <IconButton onClick={toggleSlider("right", true)}>
                <Typography
                  variant="h5"
                  style={{ color: "#FFFFC7", textAlign: "end", marginLeft: "10px" }}
                >
                  MENU
                </Typography>
                <MenuIcon style={{ color: "#FFFFC7" }} />
              </IconButton>
            </div>

            <MobilerightMenuSlider
              anchor="right"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {currentUser ? sideList("right") : null}
            </MobilerightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
