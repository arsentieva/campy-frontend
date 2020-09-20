import React, { useContext, useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid} from "@material-ui/core";
import { url } from "../../config";
import defaultPic from '../../assets/default.jpg'

import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex", 
    justifyContent: "center"
  },
  noHostedLocation: {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    minWidth: "350px", 
    minHeight: "100px"
  },
  myLocations: {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "flex-start", 
    alignItems: "center", 
    minWidth: "350px", 
    minHeight: "100px"
  },
  locationImage: {
    maxHeight: "300px",
    maxWidth: "300px",
  }
}));

export const MyLocations = () => {
  const classes = useStyles();
  const { currentUser, authToken } = useContext(CampyContext);
  const addLocationLink = `/user/add-location`;

  const [myLocations, setMyLocations] = useState([])

  // have to use useCallback to call getLocations inside useEffect
  const getLocations = useCallback( async () => {
    try {
      const res = await fetch(`${url}/locations/host`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (res.ok) {
        const json = await res.json()
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

  return currentUser ? (
    <Grid container>
      <Grid item container className={classes.flexCenter}>
        {myLocations[0] === undefined ? (
          <Paper className={classes.noHostedLocation}>
            <Typography>You Do Not Have Any Locations Yet!</Typography>
            <Typography>
              Click <a href={addLocationLink}>HERE</a> to set one up!
            </Typography>
          </Paper>
        ) : (
            <Grid item container className={classes.flexCenter}>
            {myLocations.map((location, key) => (
              <Paper key={key} className={classes.myLocations}>
                <Typography variant="subtitle2" color="primary">
                  <a href={`/location-detail/${location.id}`}>{location.title}</a>
                </Typography>
                {location.image_urls !== null ? (
                  <a href={`/location-detail/${location.id}`}>
                    <img
                      src={location.image_urls[0]}
                      alt={location.address}
                      className={classes.locationImage}
                    />
                  </a>
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
