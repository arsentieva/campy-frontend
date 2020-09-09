import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
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
import { CampyContext } from "../../CampyContext";
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
  const { currentUser, authAxios } = useContext(CampyContext);
  const history = useHistory();
  const classes = useStyles();
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
   
    authAxios.put(`/user/`, {
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      phoneNumber: currentUser.phone_number,
      domicileType: currentUser.user_info,
      userInfo: currentUser.user_info,
      imageURL: url,
    })
      .then((result) => {
        if (result.status === 200) {
          setSuccess(true);
          history.push(`/user/account`)
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err) && setIsError(err);
      });
  };
  
  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        component='form'
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
  ) : null;
};
