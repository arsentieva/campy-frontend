import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { MyLocations } from "./MyLocations";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "72px",
    padding: "10px",
    backgroundColor: theme.palette.secondary.main,
  },
  picture: {
    width: "200px",
    height: "200px",
  },
}));
export const AccountPage = () => {
  const { authTokens } = useAuth();
  const [currentUser, setCurrentUser] = useState(undefined);

  const userId = authTokens.user_id;

  const classes = useStyles();
  if (currentUser) {
    return (
      <Grid container className={classes.root}>
        <Grid container item>

        <Grid
          item
          container
          spacing={3}
          direction="column"
          justify="center"
          alignContent="center"
          xs={4}
        >
          <Grid item>
            {currentUser.image_url !== null ? (
              <Avatar className={classes.picture} src={currentUser.image_url} />
            ) : (
              <Avatar className={classes.picture} />
            )}
          </Grid>
          <Grid item>
            <IconButton component={Link} to="/edit-profile-pic">
              <Edit />
              <Typography>Edit Profile Picture</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton component={Link} to="/edit-account">
              <Edit />
              <Typography>Edit Account Information</Typography>

            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justify="space-between"
          alignContent="center"
          xs={4}
          spacing={3}
        >
          <Grid item>
            <Typography>First Name</Typography>
            <Typography>{currentUser.first_name || ""}</Typography>
          </Grid>
          <Grid item>
            <Typography>Last Name</Typography>
            <Typography>{currentUser.last_name || ""}</Typography>
          </Grid>
          <Grid item>
            <Typography>Email Address</Typography>
            <Typography>{currentUser.email || ""}</Typography>
          </Grid>
          <Grid item>
            <Typography>Phone Number</Typography>
            <Typography>{currentUser.phone_number || ""}</Typography>
          </Grid>
          <Grid item>
            <Typography>Primary Method of Camping</Typography>
            <Typography>{currentUser.domicle_type || ""}</Typography>
          </Grid>
          <Grid item>
            <Typography>Bio</Typography>
            <Typography>{currentUser.user_info || ""}</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center"  xs={4} item>
        </Grid>
      </Grid>
          <Grid item>
            <MyLocations />
          </Grid>
        </Grid>
    );
  } else {
    Axios.get(`http://localhost:5000/users/${userId}`, "User").then(
      (response) => {
        console.log(response.data);
        setCurrentUser(response.data.user);
      }
    );
    return null;
  }
};
