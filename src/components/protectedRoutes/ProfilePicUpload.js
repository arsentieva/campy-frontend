import React, { useState, useContext, useEffect, useCallback } from "react";
import { storage } from "../../Firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Avatar,
  Grid,
  Button
} from "@material-ui/core";

import SaveIcon from '@material-ui/icons/Save';
import { CampyContext } from "../../CampyContext";
import {url} from "../../config";
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

export const ProfilePicUpload = ({ setModal, imageUrl, setImageUrl }) => {
  const { currentUser, authToken } = useContext(CampyContext);
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = useCallback(() => {
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
            setImageUrl(url);
          });
      }
    );
  }, [image, setImageUrl]);

  const handleUpdate = () => {
    Axios.put(`${url}/user/`, {
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      phoneNumber: currentUser.phone_number,
      domicileType: currentUser.domicile_type,
      userInfo: currentUser.user_info,
      imageURL: imageUrl,
    }, {
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    })
      .then((result) => {
        if (result.status === 200) {
          setModal(false)
        } else {
          throw result
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (image) {
      handleUpload()
    }
  }, [image, handleUpload])
  
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
          <progress value={progress} max="100" />
        </Grid>
      </Grid>
      <Grid
        item
        xs
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Avatar
          src={imageUrl}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
      </Grid>
      <Grid
        xs
        item
        container
        justify="center"
      >
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
