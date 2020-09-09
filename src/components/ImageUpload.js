import React, { useState } from "react";
import { storage } from "../Firebase/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, InputLabel, Input, IconButton } from "@material-ui/core";
import { AddAPhoto, Send } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}))

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
