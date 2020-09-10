import React, {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import { CampyContext } from "../../CampyContext";
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
  const { currentUser } = useContext(CampyContext);
  const editLink = `/user/edit-account`;
  const editPictureLink = `/user/edit-profile-pic`;
  
  const classes = useStyles();


  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid container item>
        <Grid item container spacing={3} direction="column" justify="center" alignContent="center" xs={4}>
          <Grid item>
            {
            currentUser.image_url !== null ? 
            (<Avatar className={classes.picture} src={currentUser.image_url} />) 
            : (<Avatar className={classes.picture} />)
            }

          </Grid>
          <Grid item>
            <IconButton component={Link} to={editPictureLink}>
              <Edit />
              <Typography>Edit Profile Picture</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton component={Link} to={editLink}>
              <Edit />
              <Typography>Edit Account Information</Typography>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item direction="column" justify="space-between" alignContent="center" xs={4} spacing={3}>
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
        <Grid container justify="center" xs={4} item>
          <MyLocations />
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  ) : null;
};
