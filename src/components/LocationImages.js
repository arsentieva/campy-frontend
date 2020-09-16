import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { CampyContext } from "../CampyContext";
import { makeStyles } from "@material-ui/core/styles";
import { storage, firebase } from "../Firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  pic: {
    width: "200px",
    height: "200px",
  },
}));

export const LocationImages = (props) => {

  const location = props.location;
  const [urls, setUrls] = useState([]);
  console.dir(location);
  const images = location.image_urls;
  const storageRef = storage.ref(`location_images/`);

  const classes = useStyles();

  useEffect(() => {
    if (images) {
      (async function getFirebaseUrls() {
        let urlArray = [];
        for (let i = 0; i < images.length; i++) {
          const downloadUrl = await storageRef.child(images[i]).getDownloadURL().then((url) => url)
          urlArray.push(downloadUrl);
        }
        setUrls(urlArray);
      })();
    }
  }, [images]);

  return (
    <Grid container justify="center" alignItems="center">
      {location.image_urls
        ? urls.map((image, i) => (
          <Grid key={i} item>
            <img
              className={classes.pic}
              src={image}
              alt={`location-pic-${i}`}
            />
          </Grid>
        ))
        : "Pictures Here"}
    </Grid>
  )
}
