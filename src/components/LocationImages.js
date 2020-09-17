import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { storage, firebase } from "../Firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  pic: {
    width: "100%",
    height: "394px",
  },
}));

export const LocationImages = (props) => {

  const location = props.location;
  const [urls, setUrls] = useState([]);
  const images = location.image_urls;
  const storageRef = storage.ref(`location_images/`);

  const classes = useStyles();

  useEffect(() => {
    if (images) {
      (async function getFirebaseUrls() {
        let urlArray = [];
        console.log(urlArray)
        for (let i = 0; i < images.length; i++) {
          const downloadUrl = await storageRef.child(images[i]).getDownloadURL().then((url) => url)
          urlArray.push(downloadUrl);
        }
        setUrls(urlArray);
      })();
    }
  }, [images]);

    return (
      <Carousel className={classes.pic} interval="8000" endAt={urls.length}>
        {images
          ? urls.map((image, i) => (
            <div key={i}>
              <img
                className={classes.pic}
                src={image}
                alt={`location-pic-${i}`}
              />
              <button onClick={() => console.log(image)}>Log image</button>
            </div>
          ))
          : "Loading..."}
      </Carousel>
    )
}
