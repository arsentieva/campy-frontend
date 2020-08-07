import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, PersonAdd, PermIdentity } from "@material-ui/icons";
import { useAuth } from "../../context/AuthContext";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: "#22577A",
  },
}));

export const AuthOptions = () => {
  const classes = useStyles();

  const history = useHistory();

  const signUp = () => {
    history.push("/sign-up");
  };
  const login = () => {
    history.push("/login");
  };
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const loginDemo = () => {
    Axios.post("http://localhost:5000/auth/login", {
      email: "demo@mail.com",
      password: "password",
    })
      .then((result) => {
        setAuthTokens(result.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <List>
      <ListItem button onClick={login}>
        <ListItemIcon className={classes.listItem}>
          <Person />
          <ListItemText className={classes.listItem} primary="Login" />
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={signUp}>
        <ListItemIcon className={classes.listItem}>
          <PersonAdd />
          <ListItemText className={classes.listItem} primary="Sign Up" />
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={loginDemo}>
        <ListItemIcon className={classes.listItem}>
          <PermIdentity />
          <ListItemText className={classes.listItem} primary="Demo User" />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
