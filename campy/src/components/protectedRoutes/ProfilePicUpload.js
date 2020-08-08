import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { storage } from "../../Firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputLabel,
  TextField,
  Avatar,
  IconButton,
  Grid,
} from "@material-ui/core";
import { AddAPhoto, Send, Save } from "@material-ui/icons";
import { useAuth } from "../../context/AuthContext";
import Axios from "axios";

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

export const ProfilePicUpload = () => {
  const { authTokens } = useAuth();
  const userId = authTokens.user_id;

  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };
  console.log(url);
  const handleUpdate = () => {
    console.log(url);
    console.log(authTokens.first_name);
    Axios.put(`https://campy-backend.herokuapp.com/users/${userId}`, {
      firstName: authTokens.first_name || currentUser.first_name,
      lastName: authTokens.last_name || currentUser.last_name,
      phoneNumber: authTokens.phone_number || currentUser.phone_number,
      domicileType: authTokens.domicile_type || currentUser.user_info,
      userInfo: authTokens.user_info || currentUser.user_info,
      imageURL: url,
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
        <Grid
          item
          container
          direction="column"
          justify="space-around"
          alignContent="center"
          spacing={4}
          xs
        >
          <Grid item>
            <InputLabel>
              <AddAPhoto />
              Upload New Profile Pic
            </InputLabel>
          </Grid>
          <Grid item>
            <TextField type="file" onChange={handleChange} />
          </Grid>
          <Grid item>
            <IconButton onClick={handleUpload}>
              <Send />
              <Typography>Upload</Typography>
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          direction="column"
          justify="space-around"
          alignContent="center"
        >
          <Avatar
            src={url}
            alt="Profile"
            style={{ width: "200px", height: "200px" }}
          />
        </Grid>
        <Grid
          xs
          item
          container
          direction="column"
          justify="space-around"
          alignContent="center"
        >
          <IconButton onClick={handleUpdate}>
            <Save />
            Save Changes
          </IconButton>
        </Grid>
      </Grid>
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
};
