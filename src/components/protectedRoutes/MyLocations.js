import React, { useContext, useState, useEffect, useCallback } from "react";
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
import { Edit, Today, Link, CodeSharp } from "@material-ui/icons";
import url from "../../config";
import defaultPic from '../../assets/default.jpg'

import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

export const MyLocations = () => {
  const classes = useStyles();
  const { currentUser, authToken } = useContext(CampyContext);
  const addLocationLink = `/user/add-location`;

  const [myLocations, setMyLocations] = useState([])

  // have to use useCallback to call getLocations inside useEffect
  const getLocations = useCallback( async () => {
    try {
      const res = await fetch(`${url}/locations/host/`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      console.log("----------")
      if (res.ok) {
        const json = await res.json()
        console.log(json.locations)
        setMyLocations(json.locations)
      } else {
        throw res
      }
    } catch (e) {
      console.log(e)
    }
  }, [authToken])

  useEffect(() => {
    getLocations()
  }, [getLocations])

  console.log("myLocations: ", myLocations);
  console.log("currentUser from MyLocations.js ", currentUser)

  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid item container style={{ display: "flex", justifyContent: "center" }}>
        {myLocations[0] === undefined ? (
          <Paper style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minWidth: "350px", minHeight: "100px" }}>
            <Typography>You Do Not Have Any Locations Yet!</Typography>
            <Typography>
              Click <a href={addLocationLink}>HERE</a> to set one up!
            </Typography>
          </Paper>
        ) : (
          <Grid item container>
            {myLocations.map((location, key) => (
              <Paper key={key}>
                <Typography variant="subtitle2" color="primary">
                  {myLocations[key].address}
                </Typography>
                {myLocations[key].image_urls !== null ? (
                  <img
                    src={myLocations[key].image_urls[0]}
                    alt={myLocations[key].address}
                  />
                ) : (
                  <img src={defaultPic} alt='default, no pics' />
                )}
              </Paper>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : null;
};
