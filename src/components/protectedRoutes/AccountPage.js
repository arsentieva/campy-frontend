import React, {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import { CampyContext } from "../../CampyContext";
import { MyLocations } from "./MyLocations";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f7fafc",
    height: "100vh",
  },
  picture: {
    width: "200px",
    height: "200px",
    margin: "8px",
  },
}));
export const AccountPage = () => {
  const { currentUser } = useContext(CampyContext);
  const classes = useStyles();

  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid container item>
        <Grid container item direction="column" justify="center" alignContent="center" xs={4} spacing={3}>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            {
              currentUser.image_url !== null ? 
              (
                <Paper elevation={5}>
                  <Avatar className={classes.picture} src={currentUser.image_url} />
                </Paper>
              ) 
              : 
              (
                <Paper elevation={5}>
                  <Avatar className={classes.picture} />
                </Paper>
              )
            }

          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <IconButton component={Link} to={`/user/edit-profile-pic`}>
              <Edit fontSize="small" style={{ marginRight: "7px" }}/>
              <Typography>Edit Profile Picture</Typography>
            </IconButton>
          </Grid>
          {/* <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <IconButton component={Link} to={`/user/edit-account`}>
              <Edit />
              <Typography>Edit Account Information</Typography>
            </IconButton>
          </Grid> */}
        </Grid>
        <Grid container item direction="column" justify="space-between" alignContent="flex-start" xs={4} spacing={3}>
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
        <Grid container item justify="center" justify="space-between" alignContent="center" xs={4} >
          <MyLocations />
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  ) : null;
};
