import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pic: {
    maxHeight: "350px",
  },
}));

export const LocationImages = (props) => {

  const location = props.location;
  const classes = useStyles();

  function Image(props) {
    const classes = useStyles();
    return (
      <img
        className={classes.pic}
        src={props.image}
        alt={`location-pic${props.key}`}
      />
    );
  }

  return (
    <Carousel className={classes.fragment} interval="10000">
        {location &&
          props.images.map((image, i) => <React.Fragment key={i}><Image image={image + "&auto=format&fit=crop"} /></React.Fragment>)
        }
    </Carousel>
  )
}
