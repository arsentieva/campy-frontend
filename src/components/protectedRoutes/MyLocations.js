import React, { useContext, useEffect } from "react";
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
    background: theme.palette.primary.main,
  },
}));

let locations = [];
export const MyLocations = () => {
  const classes = useStyles();
  const { currentUser, getUser } = useContext(CampyContext);
  const addLocationLink = `/user/add-location`;

  const getLocations = () => {
    Axios.get(`${url}/locations/hosts`)
      .then((response) => {
        const [result] = response.data.locations;
        console.log(result)
        locations.push(result)
      })
      .catch((err) => {
        console.log(err);
      });
    return locations;
  };
  const myLocations = getLocations();
  console.log(myLocations);
  console.log(myLocations[0])

  return currentUser ? (
    <Grid container className={classes.root}>
      <Grid item container>
        {myLocations[0] === undefined ? (
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
