import React, {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton, Avatar, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Save } from "@material-ui/icons";
import { CampyContext } from "../../CampyContext";
import { MyLocations } from "./MyLocations";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    position: "absolute",
    top: "78px"
  },
  picture: {
    width: "180px",
    height: "180px",
    margin: "10px",
  },
  userInfoForm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },
}));

export const AccountPage = () => {
  const { currentUser, authAxios } = useContext(CampyContext);
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [domicileType, setDomicileType] = useState();
  const [userInfo, setUserInfo] = useState();

  const handleUpdate = () => {
    authAxios
      .put(`/user/`, {
        firstName: firstName || currentUser.first_name,
        lastName: lastName || currentUser.last_name,
        phoneNumber: phoneNumber || currentUser.phone_number,
        domicileType: domicileType || currentUser.domicile_type,
        userInfo: userInfo || currentUser.user_info,
        imageURL: currentUser.image_url,
      })
      .then((result) => {
        if (result.status === 200) {
          history.push(`/user/account`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid container item style={{ paddingTop: "50px" }}>
        <Grid container item direction="column">
          <Grid container item justify="center">
            <Grid container item direction="column" justify="flex-start" alignContent="center" xs={4} spacing={3}>
              <Grid item style={{ width: "auto" }}>
                {
                  currentUser.image_url !== null ? 
                  (
                    <Paper elevation={5} style={{ display: "flex", justifyContent: "center" }}>
                      <Avatar className={classes.picture} src={currentUser.image_url} />
                    </Paper>
                  ) 
                  : 
                  (
                    <Paper elevation={5} style={{ display: "flex", justifyContent: "center" }}>
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
            </Grid>
            <Grid container item xs={4} spacing={3} style={{ display: "flex", justifyContent: "center" }}>
              <form className={classes.userInfoForm} noValidate autoComplete="off">
                <TextField 
                  required 
                  id="first_name" 
                  label="First Name" 
                  defaultValue={currentUser.first_name} 
                  onChange={(e) => setFirstName(e.target.value)}/>
                <TextField 
                  required 
                  id="last_name" 
                  label="Last Name" 
                  defaultValue={currentUser.first_name} 
                  onChange={(e) => setLastName(e.target.value)}/>
                <TextField 
                  required 
                  id="email" 
                  label="Email" 
                  defaultValue={currentUser.email} />
                <TextField 
                  required 
                  id="phone_number" 
                  label="Phone Number" 
                  defaultValue={currentUser.phone_number} 
                  onChange={(e) => setPhoneNumber(e.target.value)}/>
                <TextField 
                  id="domicile_type" 
                  label="Domicile Type" 
                  helperText="Primary Method of Camping" 
                  defaultValue={currentUser.domicile_type} 
                  onChange={(e) => setDomicileType(e.target.value)} />
                <TextField 
                  id="user_info" 
                  label="Bio" 
                  multiline 
                  rows={4} 
                  defaultValue={currentUser.user_info} 
                  onChange={(e) => setUserInfo(e.target.value)}/>
              </form>
              <Grid item>
                <IconButton onClick={handleUpdate}>
                  <Save fontSize="small" style={{ marginRight: "7px" }}/>
                  <Typography>Save Changes</Typography>
                </IconButton>
              </Grid>
            </Grid>
            <Grid container item style={{ marginTop: "50px" }}>
              <MyLocations />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  ) : null;
};
