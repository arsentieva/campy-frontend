import React, { useState } from "react";
import { storage } from "../Firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, InputLabel, Input, IconButton } from "@material-ui/core";
import { AddAPhoto, Send } from "@material-ui/icons";

// firebase import and initialization
import {storage, firebase} from "../Firebase/firebaseConfig";

// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// const firebaseConfig = {
//   apiKey: "AIzaSyCZYjwxYcX9ndPsAUCVJrcRTs8SN7IidFI",
//   authDomain: "campy-810fc.firebaseapp.com",
//   databaseURL: "https://campy-810fc.firebaseio.com",
//   projectId: "campy-810fc",
//   storageBucket: "campy-810fc.appspot.com",
//   messagingSenderId: "693403754728",
//   appId: "1:693403754728:web:9198c8e4058bdc4742a95d"
// }
// firebase.initializeApp(firebaseConfig)

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    padding: "0",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  uploader: {
    WebkitAppearance: "none",
    appearance: "none",
    width: "50%",
    marginBottom: "10px",
  }

}));

export const ImageUpload = (props) => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
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
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
      //TODO: add axios call to update user or location db entries with photo url(s) -- need routes to be finished first
    );
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <InputLabel>
        <AddAPhoto />
        {props.text}
      </InputLabel>
      <Input type="file" onChange={handleChange} />
      <IconButton onClick={handleUpload}>
        <Send />
        <Typography>Upload</Typography>
      </IconButton>
      <br />
      <img
        src={url}
        alt={image.name}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};
