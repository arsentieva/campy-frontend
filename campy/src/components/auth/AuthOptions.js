import React from "react";
import { useHistory } from "react-router-dom";
import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, PersonAdd,  } from "@material-ui/icons";


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
     
    </List>
  );
};
