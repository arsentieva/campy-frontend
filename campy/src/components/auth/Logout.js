import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MeetingRoom } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, IconButton, Typography } from "@material-ui/core";

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
      <ListItem button>
        <IconButton className={classes.listItem} onClick={logOut}>
          <MeetingRoom className={classes.listItem} />
          <Typography className={classes.listItem}>Logout</Typography>
        </IconButton>
      </ListItem>
    </div>
  );
};
