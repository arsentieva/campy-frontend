import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { storage } from "../../Firebase/firebaseConfig";

import {
  Grid,
  Input,
  Typography,
  IconButton,
  Avatar,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Save, AddAPhoto } from "@material-ui/icons";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ErrorNotice } from "../ErrorNotice";

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
  const classes = useStyles();
  const { authTokens } = useAuth();
  const userId = authTokens.user_id;
  const [currentUser, setCurrentUser] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [domicileType, setDomicileType] = useState();
  const [userInfo, setUserInfo] = useState();

  const handleUpdate = () => {
    Axios.put(`http://localhost:5000/users/${userId}`, {
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
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err) && setIsError(err);
      });
  };
  if (success) {
    return <Redirect to="/account" />;
  }
  if (currentUser) {
    return (
      <Grid container className={classes.root}>
        <input type="hidden" defaultValue={currentUser.image_url} />
        <Grid item container justify="center" alignContent="center" xs={4}>
          {isError && (
            <ErrorNotice
              message={isError}
              clearError={() => setIsError(undefined)}
            />
          )}
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
