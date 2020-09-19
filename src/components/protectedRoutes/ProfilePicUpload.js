import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { storage } from "../../Firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Avatar,
  Grid,
  Button
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from '@material-ui/icons/Save';
import { CampyContext } from "../../CampyContext";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    width: "200px",
    height: "200px",
  },
  uploadButton: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "80px",
    paddingTop: "0px"
  }
}));

export const ProfilePicUpload = () => {
  const { currentUser } = useContext(CampyContext);
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
    const uploadTask = storage.ref(`user_profile_pictures/${image.name}`).put(image);
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
          .ref("user_profile_pictures")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const handleUpdate = () => {
    Axios.put(`/user/`, {
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
        spacing={2}
        xs
        style={{ marginBottom: "15px" }}
      >
        <Grid item style={{ maxHeight: "100px" }}>
          <TextField type="file" onChange={handleChange} />
        </Grid>
        <Grid item className={classes.uploadButton}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SendIcon />}
            onClick={handleUpload}>
            Upload
          </Button>
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
        justify="center"
      >
        <progress value={progress} max="100" />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={handleUpdate}
          style={{ marginTop: "20px" }}>
          Save
          </Button>
      </Grid>
    </Grid>
  ) : null;
};
