import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { storage } from "../../Firebase/firebaseConfig";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputLabel,
  TextField,
  Avatar,
  IconButton,
  Grid,
  GridList,
} from "@material-ui/core";
import { AddAPhoto, Send, Save } from "@material-ui/icons";
import { CampyContext } from "../../CampyContext";
import Axios from "axios";
import url from "../../config";


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

export const UploadLocationPics = () => {
  const { currentUser, authAxios } = useContext(CampyContext);
  const history = useHistory();
  const classes = useStyles();
  const id = window.location.pathname.split("/")[2];
  const [location, setLocation] = useState();
  // console.log(id);

  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image_urls, setImageUrls] = useState([]);

  const [images, setImages] = useState([]);

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setImages((prevState) => [...prevState, newFile]);
    }
  };
  const onUploadSubmission = (e) => {
    let urls = [];
    e.preventDefault();
    const promises = [];
    images.forEach((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(`Progress: ${progress}%`);
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          // do something with the url
          urls.push(downloadURL);
          setImageUrls(urls);
        }
      );
      console.log(urls);
      return urls;
    });
    Promise.all(promises)
      .then(() => alert("All files uploaded"))
      .catch((err) => console.log(err.code));
  };
  console.log(image_urls);

  useEffect(() => {
    (async function fetchLocation() {
      const res = await fetch(`${url}/locations/${id}`);
      const json = await res.json();
      setLocation(json.location);
    })(); // semi-colon is needed for IIFE to work
  }, []);

  console.log(location);

  const handleUpdate = (e) => {
    e.preventDefault();
    authAxios
      .put(`/locations/${id}`, {
        address: location.address,
        city: location.city,
        state: location.state,
        gps_coords: location.gps_coords,
        image_urls: image_urls,
        website: location.website,
        description: location.description,
        host_notes: location.host_notes,
        active: true,
        electric_hookup: location.electric_hookup,
        water_hookup: location.water_hookup,
        septic_hookup: location.septic_hookup,
        assigned_parking: location.assigned_parking,
        tow_vehicle_parking: location.tow_vehicle_parking,
        trash_removal: location.trash_removal,
        water_front: location.water_front,
        pets_allowed: location.pets_allowed,
        internet_access: location.internet_access,
        rv_compatible: location.rv_compatible,
        generators_allowed: location.generators_allowed,
        fires_allowed: location.fires_allowed,
        max_days: location.max_days,
        pad_type: location.pad_type,
      })
      .then((result) => {
        if (result.status === 200) {
          const id = window.location.pathname.split("/")[2];

          setSuccess(true);
          history.push(`/location-detail/${id}`);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err) && setIsError(err);
      });
  };

  return currentUser ? (
    <form className={classes.root}>
      <label>
        Select Files
        <input type="file" multiple onChange={onFileChange} />
      </label>
      <button onClick={onUploadSubmission}>Upload</button>
      <button onClick={handleUpdate}>Check Out Your Location</button>
    </form>
  ) : null;
};
