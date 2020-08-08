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

export const Location = () => {
  const classes = useStyles();
  const { authTokens } = useAuth();
  const userId = authTokens.user_id
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentLocation, setCurrentLocation] = useState(undefined)
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [gpsCoords, setGpsCoords] = useState();
  const [imageURLs, setimageURLs] = useState();
  const [website, setWebsite] = useState();
  const [description, setDescription] = useState();
  const [hostNotes, setHostNotes] = useState();
  const [active, setActive] = useState();
  const locationId = authTokens.locationId


  const handleUpdate = () => {
    Axios.get(`http://localhost:5000/locations/${location_id}`, {
      address: address || currentLocation.address,
      city: city || currentLocation.city,
      state: state || currentLocation.state,
      gpsCoords: gpsCoords || currentLocation.gpsCoords,
      imageURLs: imageURLs || currentLocation.imageURLs,
      website: website || currentLocation.website,
      description: description || currentLocation.description,
      hostNotes: hostNotes || currentLocation.hostNotes,
      active: active || currentLocation.active,
    }).then(result => {
      if (result.status === 200) {
        setSuccess(true);
      } else {
        setIsError(true)
      }
    });
  };
  if (currentLocation){
    return (
      <Grid container className={classes.root}>
        
      </Grid>
    )
  }

}
