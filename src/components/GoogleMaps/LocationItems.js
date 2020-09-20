import React, { useContext,  createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CampyContext } from "../../CampyContext";
import { Grid, Typography, IconButton, Paper, Box, CardMedia } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import TerrainIcon from '@material-ui/icons/Terrain';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "80px",
      overflowY: "scroll",
      height: "89vh"
    },
    card: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    paper: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      padding: theme.spacing(1.5),
      maxWidth: 550,
    },
    media: {
      width: 250,
      height: 145,
      
    },
  }));

export const LocationItems = () => {
  const { locations, location, loadLocation } = useContext(CampyContext);
  const refs = locations && locations.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {});

    const classes = useStyles();
    const history = useHistory();

    const handleClick = (id) => {
      loadLocation(id);
    }

     useEffect(()=> {
       if(location){
        refs && refs[location.id].current && refs[location.id].current.scrollIntoView({behavior: "smooth"});
       }
     }, [location, refs]);
    
     const handleRedirect = (id) => {
      loadLocation(id);
      history.push(`/location-detail/${id}`);
     }

    const getReviewScore = (reviews) => {
      let score = 0;
      for ( let review of reviews){
        score += review.overall_rating;
      }
      return score/reviews.length;
    };


    return (  
        <Box className={classes.root}>
         {   locations &&
             locations.map((location) => (
                <Box className={classes.card} onClick={()=>handleClick(location.id)}>
                   <Paper key={location.id} ref={refs[location.id]} className={classes.paper} elevation={3}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <CardMedia className={classes.media} image={location.image_urls[0]} title={location.title}/>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">{location.title}</Typography>
                              <Rating value={ getReviewScore(location.reviews)}
                                precision={0.5}
                                icon={<TerrainIcon fontSize="inherit" />}
                                readOnly
                              />
                          </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={()=>handleRedirect(location.id)}>
                              <OpenInNewIcon style={{fontSize: 30, color: "#39A5A7"}}/> 
                            </IconButton>
                      </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
                ))
        }
              </Box>
    );
}