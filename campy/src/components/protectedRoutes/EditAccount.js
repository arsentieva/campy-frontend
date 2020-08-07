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

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [domicileType, setDomicileType] = useState();
  const [userInfo, setUserInfo] = useState();
  const [image_url, setimage_url] = useState();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
          .then((image_url) => {
            setimage_url(image_url);
            console.log(image_url);
          });
      }
    );
  };
  const handleUpdate = async () => {
    handleUpload()
    await Axios.put(`http://localhost:5000/users/${userId}`, {
      firstName,
      lastName,
      phoneNumber,
      domicileType,
      userInfo,
      image_url
    })
      .then(() => {
        return <Redirect to="/account" />;
      })
      .catch((err) => console.log(err));
  };
  if (currentUser) {
    return (
      <Grid container className={classes.root}>
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
                defaultValue={currentUser.first_name || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography>Last Name</Typography>
              <TextField
                defaultValue={currentUser.last_name || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography>Phone Number</Typography>
              <TextField
                defaultValue={currentUser.phone_number || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography>Primary Method of Camping</Typography>
              <TextField
                defaultValue={currentUser.domicile_type || ""}
                onChange={(e) => setDomicileType(e.target.value)}
              />
            </Grid>
            <Grid item xs>
              <Typography>Bio</Typography>
              <TextareaAutosize
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
            <Typography>
              <AddAPhoto />
              Profile Picture
            </Typography>
            <Input type="file" onChange={handleChange} />
          </Grid>
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
