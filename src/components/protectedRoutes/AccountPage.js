import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton, Avatar, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import { CampyContext } from "../../CampyContext";
import { MyLocations } from "./MyLocations";


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#f7fafc",
    height: "100vh",
    position: "absolute",
    top: "78px"
  },
  picture: {
    width: "200px",
    height: "200px",
    margin: "8px",
  },
  userInfoForm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },
}));

export const AccountPage = () => {
  const { currentUser } = useContext(CampyContext);
  const classes = useStyles();

  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid container item>
        <Grid container item direction="column" justify="flex-start" alignContent="center" xs={4} spacing={3}>
          <Grid item>
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
        <Grid container item justify="center" alignContent="center" xs={4} spacing={3}>
          <form className={classes.userInfoForm} noValidate autoComplete="off">
            <TextField required id="first_name" label="First Name" defaultValue={currentUser.first_name} />
            <TextField required id="last_name" label="Last Name" defaultValue={currentUser.first_name} />
            <TextField required id="email" label="Email" defaultValue={currentUser.email} />
            <TextField required id="phone_number" label="Phone Number" defaultValue={currentUser.phone_number} />
            <TextField id="domicile_type" label="Domicile Type" helperText="Primary Method of Camping" defaultValue={currentUser.domicile_type} />
            <TextField id="user_info" label="Bio" multiline rows={4} defaultValue={currentUser.user_info} />
          </form>
        </Grid>
        <Grid container item justify="center" alignContent="center" xs={4} >
          <MyLocations />
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  ) : null;
};
