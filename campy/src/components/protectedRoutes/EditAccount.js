import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Save } from "@material-ui/icons";
import { CampyContext } from "../../context/CampyContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "25vh",
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },
  picture: {
    width: "200px",
    height: "200px",
  },
}));

export const EditAccount = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, userID, authAxios, getUser } = useContext(CampyContext);
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [domicileType, setDomicileType] = useState();
  const [userInfo, setUserInfo] = useState();

  const handleUpdate = () => {
    authAxios
      .put(`/users/${userID}`, {
        firstName: firstName || currentUser.first_name,
        lastName: lastName || currentUser.last_name,
        phoneNumber: phoneNumber || currentUser.phone_number,
        domicileType: domicileType || currentUser.domicile_type,
        userInfo: userInfo || currentUser.user_info,
        imageURL: currentUser.image_url,
      })
      .then((result) => {
        if (result.status === 200) {
          setSuccess(true);
          history.push('/account');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getUserData = async () => {
      await getUser(userID);
    };
    getUserData();
  }, [userID]);
  return currentUser ? (
    <Grid container className={classes.root}>
      <input type="hidden" defaultValue={currentUser.image_url} />
      <Grid item container justify="center" alignContent="center" xs={4}>
        <Grid item>
          {currentUser.image_url !== null ? (
            <Avatar className={classes.picture} src={currentUser.image_url} />
          ) : (
            <Avatar className={classes.picture} />
          )}
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
        <Grid
          container
          item
          component="form"
          spacing={10}
          justify="space-between"
        >
          <Grid item>
            <Typography>First Name</Typography>
            <TextField
              value={firstName}
              defaultValue={currentUser.first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>Last Name</Typography>
            <TextField
              value={lastName}
              defaultValue={currentUser.last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>Phone Number</Typography>
            <TextField
              value={phoneNumber}
              defaultValue={currentUser.phone_number || ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>Primary Method of Camping</Typography>
            <TextField
              value={domicileType}
              defaultValue={currentUser.domicile_type || ""}
              onChange={(e) => setDomicileType(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            <Typography>Bio</Typography>
            <TextareaAutosize
              value={userInfo}
              rowsMin={8}
              style={{ width: "100%" }}
              defaultValue={currentUser.user_info || ""}
              onChange={(e) => setUserInfo(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="space-around"
        alignContent="center"
        xs={4}
      >
        <Grid item>
          <IconButton onClick={handleUpdate}>
            <Save />
            Save Changes
          </IconButton>
        </Grid>
      </Grid>
<<<<<<< HEAD
    </Grid>
  ) : null;
=======
    );
  } else {
    Axios.get(`https://campy-backend.herokuapp.com/users/${userId}`, "User").then(
      (response) => {
        console.log(response.data);
        setCurrentUser(response.data.user);
      }
    );
    return null;
  }
>>>>>>> 8bd48c5d793be0f023912846e2893e1f6e32c89d
};
