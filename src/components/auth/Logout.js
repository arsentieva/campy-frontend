import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import { MeetingRoom } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {CampyContext} from '../../CampyContext'

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: "#22577A",
  },
}));

export const Logout = () => {
  const { logOut } = useContext(CampyContext); //TODO not need to use context to logout
  const history = useHistory();
  const classes = useStyles();
  const handleLogOut = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div>
      <ListItem button onClick={handleLogOut}>
        <ListItemIcon className={classes.listItem} >
          <MeetingRoom className={classes.listItem} />
          <ListItemText className={classes.listItem}>Logout</ListItemText>
        </ListItemIcon>
      </ListItem>
    </div>
  );
};
