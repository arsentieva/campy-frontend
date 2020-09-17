import React, {  useContext, useState } from "react";
import { 
  Grid, 
  Avatar, 
  Paper, 
  TextField, 
  Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { CampyContext } from "../../CampyContext";
import { MyLocations } from "./MyLocations";
import { useHistory } from "react-router-dom";
import url from "../../config";


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
      width: 400,
    },
    display: "flex",
    flexWrap: "wrap",
  },
  flexCenter: {
    display: "flex", 
    justifyContent: "center"
  }
}));

export const AccountPage = () => {
  const { currentUser, authToken } = useContext(CampyContext);
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [domicileType, setDomicileType] = useState();
  const [userInfo, setUserInfo] = useState();
  const [showEditProfilePic, setShowEditProfilePic] = useState(true);

  const reqBody = currentUser ? {
    "firstName": firstName ? firstName : currentUser.first_name,
    "lastName": lastName ? lastName : currentUser.last_name,
    "phoneNumber": phoneNumber ? phoneNumber : currentUser.phone_number,
    "domicileType": domicileType ? domicileType : currentUser.domicile_type,
    "userInfo": userInfo ? userInfo : currentUser.user_info,
    "imageURL": currentUser.image_url
  } : {}
  
  const handleUpdate = async () => {
    console.log('reqbody: ', reqBody)
    try {
      const res = await fetch(`${url}/user/`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
      })

      if (res.ok) {
        history.push("/user/account")
      } else {
        throw res
      }
    } catch(e) {
      console.log(e)
    }
  };

  const editProfilePic = () => {

  }

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
                    <Paper elevation={5} className={classes.flexCenter}>
                      <Avatar className={classes.picture} src={currentUser.image_url} />
                    </Paper>
                  ) 
                  : 
                  (
                    <Paper elevation={5} className={classes.flexCenter}>
                      <Avatar className={classes.picture} />
                    </Paper>
                  )
                }
              </Grid>
              <Grid item className={classes.flexCenter}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={editProfilePic}>
                  Edit Profile Picture
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={4} spacing={3}>
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
                  defaultValue={currentUser.last_name} 
                  onChange={(e) => setLastName(e.target.value)}/>
                <TextField 
                  InputProps={{ readOnly: true}} 
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
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdate}>
                    Save
                </Button>
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
