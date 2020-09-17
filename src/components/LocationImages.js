import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { storage, firebase } from "../Firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  pic: {
    // width: "100%",
    maxHeight: "350px",
  },
  fragment: {
    // minHeight: "394px"
  }
}));

export const LocationImages = (props) => {

  const location = props.location;
  const classes = useStyles();
  return (
      <Carousel className={classes.fragment} interval="8000">
        { location &&
          props.images.map((image, i) => <React.Fragment key={i}><Image image={image} /></React.Fragment>)
        }
      </Carousel>
  )
}

function Image(props) {
  const classes = useStyles();
  return (
    <img
      className={classes.pic}
      src={props.image}
      alt={`location-pic${props.key}`}
    >
    </img>
  );
}
