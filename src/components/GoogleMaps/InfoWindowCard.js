import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function InfoWindowCard({ title, id, image }) {
  const classes = useStyles();
  const history = useHistory();
  const { loadLocation } = useContext(CampyContext);

  const handleRedirect = (id) => {
    loadLocation(id);
    history.push(`/location-detail/${id}`);
   };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title}/>
        <CardContent>
          <Typography variant="body1" >{ title }</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" variant="outlined" size="small" onClick={()=> handleRedirect(id)}> Learn More </Button>
      </CardActions>
    </Card>
  );
}