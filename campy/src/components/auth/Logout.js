import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MeetingRoom } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: "#22577A",
  },
}));

export const Logout = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens(null);
    history.push("/");
  };
  return (
    <div>
      <ListItem button onClick={logOut}>
        <ListItemIcon className={classes.listItem} >
          <MeetingRoom className={classes.listItem} />
          <ListItemText className={classes.listItem}>Logout</ListItemText>
        </ListItemIcon>
      </ListItem>
    </div>
  );
};
