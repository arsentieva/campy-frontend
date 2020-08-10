import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
  Avatar,
  Paper,
  Grid,
} from "@material-ui/core";
import { Edit, Today, Link } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import { CampyContext } from "../../context/CampyContext";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

export const MyLocations = () => {
  const classes = useStyles();
  const { currentUser, getUser, userID, authAxios } = useContext(CampyContext);
  const addLocationLink = `/users/${userID}/add-location`;
  console.log(userID);


  const getLocations = () => {
    let locations = [];
    Axios.get(`http://localhost:5000/locations/hosts/${userID}`)
      .then((response) => {
        locations.push(response.data.locations);
      })
      .catch((err) => {
        console.log(err);
      });
    return locations;
  };
  const myLocations = getLocations();

  console.log(myLocations, "+++");
 
  
  

  useEffect(() => {
    const getUserData = async () => {
      await getUser(userID);
    };
    getUserData();
  }, [userID]);
  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid item container>
        {myLocations === [] ? (
          <Paper>
              <Typography>You Do Not Have Any Locations Yet!</Typography>
              <Typography>
                Click <a href={addLocationLink}>HERE</a> to set one up!
              </Typography>
          </Paper>
        ) : (
          <Grid item container>
            {myLocations.map((location, key) => (
              <Paper key={key}>
                <Typography variant='subtitle2' color='secondary'>{myLocations[location].address}</Typography>
                
             </Paper>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : null;
};
